import os
import json
import logging
from typing import Dict, Any, List, Optional
import httpx
from app.core.config import settings
from app.models.submission import SubmissionVerdictEnum

logger = logging.getLogger("arise.gemini_judge")


class GeminiJudgeService:
    """
    AI-powered Code Evaluation & DSA Verification using Google Gemini API.
    Evaluates solutions across any programming language (Python, C, C++, Java, JS, TS, Go, Rust),
    checking algorithmic correctness, language-specific syntax invariants, test case satisfaction,
    and asymptotic time/space bounds.
    """

    def __init__(self):
        self.client = httpx.Client(timeout=15.0)

    def get_api_key(self) -> str:
        """Retrieves Gemini API Key from settings or environment."""
        key = getattr(settings, "GEMINI_API_KEY", "") or os.environ.get("GEMINI_API_KEY", "") or os.environ.get("GOOGLE_API_KEY", "")
        return key.strip()

    def is_available(self) -> bool:
        """Returns True if a valid Gemini API key is configured."""
        return bool(self.get_api_key())

    def evaluate(
        self,
        problem: dict,
        language: str,
        source_code: str,
        test_cases: List[dict],
        override_key: Optional[str] = None
    ) -> Optional[Dict[str, Any]]:
        """
        Submits code to Google Gemini API for comprehensive multi-language evaluation.
        Returns evaluation dict if successful, or None if Gemini is not available or encounters error.
        """
        api_key = (override_key or "").strip() or self.get_api_key()
        if not api_key:
            return None

        model = getattr(settings, "GEMINI_MODEL", "gemini-2.5-flash") or "gemini-2.5-flash"
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

        # Clean test cases for prompt
        sample_cases = []
        for idx, tc in enumerate(test_cases[:5], 1):
            sample_cases.append({
                "case_number": idx,
                "input": tc.get("input"),
                "expected": tc.get("expected")
            })

        system_prompt = f"""You are the official ARISE DSA Code Judge and automated grading engine.
Your task is to rigorously evaluate a student's solution submitted in {language.upper()}.

PROBLEM DETAILS:
- Title: {problem.get('title', 'DSA Challenge')}
- Statement: {problem.get('statement', '')}
- Constraints: {problem.get('constraints', '')}
- Test Cases to Validate: {json.dumps(sample_cases, indent=2)}

STUDENT CODE IN {language.upper()}:
```{language}
{source_code}
```

EVALUATION RULES:
1. UNMODIFIED STARTER TEMPLATE: If the student code is just the default template or contains only 'pass' / 'return 0' / 'return NULL' / empty function without algorithm logic, verdict MUST be 'WRONG_ANSWER' with error_message 'Unmodified starter code. Please implement your algorithmic logic.'
2. SYNTAX / COMPILATION: Does the code compile and have valid syntax for {language.upper()}? If not, verdict = 'COMPILATION_ERROR' with precise error_message.
3. RUNTIME EXCEPTIONS: Does the code trigger a runtime exception (out-of-bounds, null pointer, recursion depth, divide by zero)? If so, verdict = 'RUNTIME_ERROR'.
4. CORRECTNESS: Does the algorithm produce the exact expected outputs for all test cases and edge cases? If not, verdict = 'WRONG_ANSWER'.
5. TIME COMPLEXITY: Does it satisfy the problem constraints without infinite loop? If not, verdict = 'TIME_LIMIT_EXCEEDED'.
6. ACCEPTED: If the logic is sound and satisfies all test cases in {language.upper()}, verdict = 'ACCEPTED'.

You must respond ONLY with a valid JSON object strictly matching this schema:
{{
  "verdict": "ACCEPTED" | "WRONG_ANSWER" | "COMPILATION_ERROR" | "RUNTIME_ERROR" | "TIME_LIMIT_EXCEEDED",
  "is_accepted": boolean,
  "execution_time_ms": integer (e.g. 2 to 25),
  "memory_kb": integer (e.g. 10240 to 14200),
  "failing_test_case_index": integer or null,
  "error_message": string or null,
  "feedback": string
}}
"""

        payload = {
            "contents": [{
                "parts": [{
                    "text": system_prompt
                }]
            }],
            "generationConfig": {
                "responseMimeType": "application/json",
                "temperature": 0.0
            }
        }

        try:
            resp = self.client.post(url, json=payload)
            if resp.status_code != 200:
                logger.warning(f"Gemini API returned status {resp.status_code}: {resp.text}")
                return None

            data = resp.json()
            candidates = data.get("candidates", [])
            if not candidates:
                return None

            text = candidates[0].get("content", {}).get("parts", [{}])[0].get("text", "")
            if not text:
                return None

            result = json.loads(text)
            verdict_str = result.get("verdict", "").upper()

            verdict_map = {
                "ACCEPTED": SubmissionVerdictEnum.ACCEPTED,
                "WRONG_ANSWER": SubmissionVerdictEnum.WRONG_ANSWER,
                "COMPILATION_ERROR": SubmissionVerdictEnum.COMPILATION_ERROR,
                "RUNTIME_ERROR": SubmissionVerdictEnum.RUNTIME_ERROR,
                "TIME_LIMIT_EXCEEDED": SubmissionVerdictEnum.TIME_LIMIT_EXCEEDED,
            }
            verdict = verdict_map.get(verdict_str, SubmissionVerdictEnum.WRONG_ANSWER)

            return {
                "verdict": verdict,
                "execution_time_ms": result.get("execution_time_ms", 6),
                "memory_kb": result.get("memory_kb", 11200),
                "failing_test_case_index": result.get("failing_test_case_index"),
                "error_message": result.get("error_message"),
                "feedback": result.get("feedback", ""),
                "evaluator": "gemini"
            }

        except Exception as e:
            logger.warning(f"Gemini Judge evaluation encountered error: {e}")
            return None


gemini_judge_service = GeminiJudgeService()
