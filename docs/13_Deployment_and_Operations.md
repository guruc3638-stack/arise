# 13: Deployment and Operations Runbook

**Version:** 1.0

## 1. Local prerequisites
- Node.js LTS and npm
- Python 3.11+
- Git
- VS Code or another editor
- PostgreSQL/Supabase project only when database integration begins

## 2. Current starter scaffold (initial foundation)
Frontend:
```powershell
cd frontend
npm install
npm run dev
```
Backend, from another terminal:
```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
uvicorn app.main:app --reload
```
Development frontend usually runs on `http://localhost:5173`; FastAPI on `http://127.0.0.1:8000`.

## 3. Configuration
- Copy a committed `.env.example` to local `.env` and fill in local values.
- Do not commit `.env`, database passwords, service-role keys, or judge secrets.
- Frontend variables prefixed `VITE_` are exposed to the browser; only public values belong there.

## 4. Production deployment checklist
- Separate staging and production databases/credentials.
- Configure HTTPS and exact CORS origins.
- Apply database migrations.
- Enable database policies/RLS where applicable and test them.
- Create private storage bucket and test access controls.
- Set backups and verify restore procedure.
- Configure logs, error monitoring, and health checks.
- Run security and end-to-end tests.
- Verify XP totals reconcile with ledger.
- Verify 80% course threshold.
- Verify all third-party content and integrations have required permission.
- Publish privacy notice, terms, retention and account deletion process.
- Do not launch public code execution until sandbox controls are reviewed.

## 5. Operational monitoring
Track:
- API error rates and latency
- submission/judge failure rate
- duplicate XP attempts blocked
- leaderboard calculation duration
- file upload failures/storage use
- database backup/restore health

Do not log passwords, access tokens, private file URLs, or full user source code unless required for debugging with a documented retention/security policy.
