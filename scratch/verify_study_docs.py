import urllib.request
import json

req = urllib.request.Request(
    'http://127.0.0.1:8000/api/v1/auth/login',
    data=json.dumps({'email': 'xyz@gmail.com', 'password': 'xyz12345'}).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
token = data.get('access_token') or data.get('token')

req2 = urllib.request.Request(
    'http://127.0.0.1:8000/api/v1/study-files',
    headers={'Authorization': f'Bearer {token}'}
)
with urllib.request.urlopen(req2) as resp:
    docs = json.loads(resp.read().decode('utf-8'))

print(f"Total docs for xyz@gmail.com: {len(docs)}")
for d in docs:
    fname = d.get('original_filename') or d.get('filename') or d.get('file_name') or d.get('title')
    sz = d.get('size_bytes') or d.get('file_size_bytes', 0)
    kb = sz / 1024
    pg = d.get('page_count') or d.get('total_pages')
    print(f"- {fname}: {sz} bytes ({kb:.1f} KB), pages={pg}")

sample_id = docs[0]['id']
req3 = urllib.request.Request(
    f"http://127.0.0.1:8000/api/v1/study-files/{sample_id}/download",
    headers={'Authorization': f'Bearer {token}'}
)
with urllib.request.urlopen(req3) as resp:
    content = resp.read()

print("Doc 0 keys:", list(docs[0].keys()))
print(f"\nDownload sample ({docs[0].get('name') or docs[0].get('file_name')}): status=200, content-length={len(content)}")
pdf_text = content.decode('latin1', errors='ignore')
print("PDF header check:", pdf_text[:15])
page_count = pdf_text.count("/Type /Page\n") + pdf_text.count("/Type /Page ")
print(f"Detected /Type /Page count in PDF: {page_count}")
exit(0)

if not token:
    print("Login failed:", res.json())
    exit(1)

files_res = requests.get('http://127.0.0.1:8000/api/v1/study-files', headers={'Authorization': f'Bearer {token}'})
docs = files_res.json()
print(f"Total docs for xyz@gmail.com: {len(docs)}")
for d in docs:
    kb = d['size_bytes'] / 1024
    print(f"- {d['filename']}: {d['size_bytes']} bytes ({kb:.1f} KB), pages={d.get('page_count')}")

# Also verify downloading one of the files and checking PDF structure
sample_id = docs[0]['id']
dl_res = requests.get(f"http://127.0.0.1:8000/api/v1/study-files/{sample_id}/download", headers={'Authorization': f'Bearer {token}'})
print(f"\nDownload sample ({docs[0]['filename']}): status={dl_res.status_code}, content-length={len(dl_res.content)}")
pdf_text = dl_res.content.decode('latin1', errors='ignore')
print("PDF header check:", pdf_text[:15])
page_count = pdf_text.count("/Type /Page\n") + pdf_text.count("/Type /Page ")
print(f"Detected /Type /Page count in PDF: {page_count}")
