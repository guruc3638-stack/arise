import urllib.request, json

# 1. Signup or Login
token = None
try:
    req = urllib.request.Request(
        'http://127.0.0.1:8000/api/v1/auth/signup',
        data=json.dumps({'email': 'guruc3638@gmail.com', 'password': 'Password123!', 'display_name': 'Guru'}).encode(),
        headers={'Content-Type': 'application/json'}
    )
    resp = urllib.request.urlopen(req)
    token = json.loads(resp.read().decode())['access_token']
except Exception:
    req = urllib.request.Request(
        'http://127.0.0.1:8000/api/v1/auth/login',
        data=json.dumps({'email': 'guruc3638@gmail.com', 'password': 'Password123!'}).encode(),
        headers={'Content-Type': 'application/json'}
    )
    resp = urllib.request.urlopen(req)
    token = json.loads(resp.read().decode())['access_token']
print("Got token:", token[:20])

# 2. Upload
boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
crlf = '\r\n'
body = (
    f'--{boundary}{crlf}'
    f'Content-Disposition: form-data; name="file"; filename="lecture1.pdf"{crlf}'
    f'Content-Type: application/pdf{crlf}{crlf}'
    f'%PDF-1.4 test document content\n%%EOF{crlf}'
    f'--{boundary}--{crlf}'
).encode('utf-8')

upload_req = urllib.request.Request(
    'http://127.0.0.1:8000/api/v1/study-files',
    data=body,
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': f'multipart/form-data; boundary={boundary}',
        'Origin': 'http://localhost:3000'
    }
)
upload_resp = urllib.request.urlopen(upload_req)
print("Upload status:", upload_resp.status)
print("Upload body:", upload_resp.read().decode())
