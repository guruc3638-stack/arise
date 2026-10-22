import urllib.request
import json

def test_api():
    # Login as xyz@gmail.com
    login_req = urllib.request.Request(
        'http://127.0.0.1:8000/api/v1/auth/login',
        data=json.dumps({'email': 'xyz@gmail.com', 'password': 'xyz12345'}).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(login_req) as resp:
        auth_data = json.loads(resp.read().decode('utf-8'))
    token = auth_data['access_token']
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }

    print("=== TEST 1: LIVE API SUBMISSION OF REAL PYTHON TWO SUM ===")
    real_py_code = """class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, val in enumerate(nums):
            comp = target - val
            if comp in seen:
                return [seen[comp], i]
            seen[val] = i
        return []
"""
    req1 = urllib.request.Request(
        'http://127.0.0.1:8000/api/v1/problems/ARISE-P101/submissions',
        data=json.dumps({
            'language': 'python',
            'source_code': real_py_code,
            'idempotency_key': 'test-sub-' + str(json.loads(json.dumps(id(real_py_code))))
        }).encode('utf-8'),
        headers=headers
    )
    with urllib.request.urlopen(req1) as resp:
        res1 = json.loads(resp.read().decode('utf-8'))
    print("Verdict:", res1.get('verdict'))
    print("Execution time:", res1.get('execution_time_ms'), "ms")
    print("Memory:", res1.get('memory_kb'), "KB")
    print("Error message:", res1.get('error_message'))
    assert res1.get('verdict') == 'ACCEPTED', f"Expected ACCEPTED, got {res1.get('verdict')}"
    print("✔ Real Python Two Sum successfully evaluated as ACCEPTED with no runtime errors!")

    print("\n=== TEST 2: LIVE API SUBMISSION OF UNMODIFIED STARTER TEMPLATE ===")
    starter_code = """class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Implement optimal O(N) hash map solution
        pass
"""
    req2 = urllib.request.Request(
        'http://127.0.0.1:8000/api/v1/problems/ARISE-P101/submissions',
        data=json.dumps({
            'language': 'python',
            'source_code': starter_code,
            'idempotency_key': 'test-starter-' + str(id(starter_code))
        }).encode('utf-8'),
        headers=headers
    )
    with urllib.request.urlopen(req2) as resp:
        res2 = json.loads(resp.read().decode('utf-8'))
    print("Verdict:", res2.get('verdict'))
    print("Error message:", res2.get('error_message'))
    assert res2.get('verdict') == 'WRONG_ANSWER', f"Expected WRONG_ANSWER, got {res2.get('verdict')}"
    assert 'Unmodified starter code' in res2.get('error_message'), "Must clearly state unmodified starter code"
    print("✔ Unmodified starter code gracefully reports WRONG_ANSWER without fake runtime errors!")

    print("\n=== TEST 3: LIVE API SUBMISSION OF REAL JAVASCRIPT TWO SUM ===")
    real_js_code = """function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (seen.has(comp)) return [seen.get(comp), i];
        seen.set(nums[i], i);
    }
    return [];
}
"""
    req3 = urllib.request.Request(
        'http://127.0.0.1:8000/api/v1/problems/ARISE-P101/submissions',
        data=json.dumps({
            'language': 'javascript',
            'source_code': real_js_code,
            'idempotency_key': 'test-js-' + str(id(real_js_code))
        }).encode('utf-8'),
        headers=headers
    )
    with urllib.request.urlopen(req3) as resp:
        res3 = json.loads(resp.read().decode('utf-8'))
    print("Verdict:", res3.get('verdict'))
    print("Execution time:", res3.get('execution_time_ms'), "ms")
    assert res3.get('verdict') == 'ACCEPTED', f"Expected ACCEPTED, got {res3.get('verdict')}"
    print("✔ JavaScript solution via Node.js successfully evaluated as ACCEPTED!")

    print("\n>>> ALL LIVE JUDGE API VERIFICATIONS PASSED 100%! <<<")

if __name__ == '__main__':
    test_api()
