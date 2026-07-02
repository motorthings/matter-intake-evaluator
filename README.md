# Matter Intake Evaluator

AI-powered legal matter intake evaluation demo — built for Perkins Coie (AmLaw 50).

Paste a matter summary → get back classification, conflict check, risk assessment, and staffing recommendation with scores and reasoning.

## Architecture

```
User → Next.js 16 (Vercel) → FastAPI (Fly.io) → DeepSeek / Claude API
                                   ↓
                          Two-stage pipeline:
                          Router (classify) → Evaluator (5-dimension scoring)
```

## 5 Evaluation Dimensions

| Dimension | Weight |
|---|---|
| Practice Area Classification Accuracy | 25% |
| Urgency & Risk Assessment | 25% |
| Conflict Check Completeness | 20% |
| Staffing Recommendation Quality | 15% |
| Client/Matter Data Integrity | 15% |

## Quick Start

### Backend

```bash
cd backend
cp .env.example .env
# Add your LLM_API_KEY (DeepSeek or Anthropic — auto-detected by key prefix)
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

### Tests

```bash
cd backend
python -m pytest tests/ -v
```

## API

`POST /api/evaluate`

```json
{
  "matter_summary": "Proposed acquisition of TargetCo by Acme Corp..."
}
```

Returns structured JSON with scores, reasoning, risk level, staffing recommendation, and conflict flags.

## LLM Providers

Auto-detected from API key prefix:
- `sk-ant-...` → Anthropic (Claude)
- `sk-...` → OpenAI-compatible (DeepSeek by default)

Override with `LLM_BASE_URL` and `LLM_MODEL` env vars.

## Deploy

- **Backend**: Fly.io — `cd backend && flyctl deploy`
- **Frontend**: Vercel — `cd frontend && vercel --prod`
