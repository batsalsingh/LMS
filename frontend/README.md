# LuminEd Frontend

Vite + React frontend for the LMS platform.

## Environment Variables

Create a `.env` file in this folder:

```bash
cp .env.example .env
```

Required variables:

- `VITE_API_URL`: Base URL for backend API, including `/api`

Local example: `http://localhost:5000/api`

Render example: `https://<your-backend-service>.onrender.com/api`

Optional variables:

- `VITE_UNSPLASH_ACCESS_KEY`: Unsplash image API access key

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Render Deployment Note

Set `VITE_API_URL` in the Render frontend service Environment settings before deploy.
If this variable is missing, production falls back to `/api` (same-origin), which only works if the frontend and backend are served from the same host.
