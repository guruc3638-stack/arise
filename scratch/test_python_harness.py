import sys
import json
import inspect

def test_harness():
    user_code = """
class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, val in enumerate(nums):
            comp = target - val
            if comp in seen:
                return [seen[comp], i]
            seen[val] = i
        return []
"""
    test_cases = [
        {'id': 1, 'input': 'nums = [2, 7, 11, 15], target = 9', 'expected': '[0, 1]'},
        {'id': 2, 'input': 'nums = [3, 2, 4], target = 6', 'expected': '[1, 2]'},
        {'id': 3, 'input': 'nums = [3, 3], target = 6', 'expected': '[0, 1]'}
    ]

    harness = f"""
import sys, json, inspect

# 1. Execute user code in a dedicated module scope
user_scope = {{}}
exec({repr(user_code)}, user_scope)

# 2. Find Solution instance method or standalone function
func = None
if 'Solution' in user_scope and isinstance(user_scope['Solution'], type):
    inst = user_scope['Solution']()
    for attr in dir(inst):
        if not attr.startswith('_') and callable(getattr(inst, attr)):
            func = getattr(inst, attr)
            break

if not func:
    for name, obj in user_scope.items():
        if callable(obj) and not name.startswith('_') and name not in ['json', 'sys', 'inspect']:
            func = obj
            break

if not func:
    print(json.dumps({{"status": "ce", "message": "No callable function found in solution."}}))
    sys.exit(0)

def parse_val(v):
    v = v.strip()
    if v == 'true': return True
    if v == 'false': return False
    if v == 'null': return None
    try:
        return json.loads(v)
    except Exception:
        return v

def deep_equal(a, b):
    if a == b: return True
    if isinstance(a, list) and isinstance(b, list):
        if len(a) != len(b): return False
        if len(a) == 2 and a[0] == b[1] and a[1] == b[0]: return True
        return all(deep_equal(x, y) for x, y in zip(a, b))
    return str(a).strip() == str(b).strip()

test_cases = {repr(test_cases)}

for idx, tc in enumerate(test_cases):
    # Parse input string into kwargs
    in_scope = {{}}
    try:
        import re
        inp_stmt = re.sub(r',\s*([a-zA-Z_]\w*\s*=)', r'; \g<1>', tc['input'])
        exec(inp_stmt, {{'null': None, 'true': True, 'false': False}}, in_scope)
    except Exception as e:
        print(json.dumps({{"status": "re", "index": idx + 1, "message": f"Input parse error: {{e}}"}}))
        sys.exit(0)

    try:
        sig = inspect.signature(func)
        call_kwargs = {{}}
        for param_name in sig.parameters:
            if param_name in in_scope:
                call_kwargs[param_name] = in_scope[param_name]
        
        if len(call_kwargs) == len(sig.parameters):
            actual = func(**call_kwargs)
        else:
            actual = func(*list(in_scope.values()))
    except Exception as e:
        print(json.dumps({{"status": "re", "index": idx + 1, "message": str(e)}}))
        sys.exit(0)

    expected = parse_val(tc['expected'])
    if not deep_equal(actual, expected):
        print(json.dumps({{"status": "wa", "index": idx + 1, "expected": expected, "actual": actual}}))
        sys.exit(0)

print(json.dumps({{"status": "accepted", "total": len(test_cases)}}))
"""

    import subprocess
    proc = subprocess.run([sys.executable, "-c", harness], capture_output=True, text=True)
    print("Return code:", proc.returncode)
    print("Stdout:", proc.stdout.strip())
    print("Stderr:", proc.stderr.strip())

if __name__ == '__main__':
    test_harness()
