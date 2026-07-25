# Orbisedg Full-Stack Website

A custom Orbisedg agency website recreated with an original Next.js and Express implementation inspired by the supplied Nimo visual direction.

## Stack

- **Frontend:** Next.js 16, React, TypeScript
- **Backend:** Node.js, Express 5, TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Local database:** Docker Compose
- **Recommended hosting:** Vercel for the frontend, Render for the API and PostgreSQL

## Included pages

- Home
- About
- Services overview
- Seven individual service pages
- Work overview
- Three individual case studies
- Contact form
- Privacy policy

## Quick start

### 1. Requirements

- Node.js 22+
- npm 10+
- Docker Desktop, or another PostgreSQL database

### 2. Install packages

```bash
npm install
```

### 3. Start PostgreSQL

```bash
docker compose up -d
```

### 4. Configure environment files

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

### 5. Create and seed the database

```bash
npm run db:deploy
npm run db:seed
```

### 6. Start both applications

```bash
npm run dev
```

- Website: `http://localhost:3000`
- API: `http://localhost:4000`
- Health check: `http://localhost:4000/api/health`

## Deployment

### Backend and PostgreSQL on Render

1. Push the repository to GitHub.
2. In Render, create a Blueprint and select the repository.
3. Render reads `render.yaml` and creates the API and PostgreSQL database.
4. Set `ALLOWED_ORIGINS` to the final Vercel URL, for example `https://orbisedg.vercel.app`.
5. The included Blueprint uses Render's free instances for testing. Before a real launch, switch the API and database to paid plans because free web services can sleep and free PostgreSQL databases expire.
6. Copy the deployed API URL.

### Frontend on Vercel

1. Import the same repository into Vercel.
2. Set the project root directory to `apps/web`.
3. Add `NEXT_PUBLIC_API_URL` with the Render API URL.
4. Deploy.

### Custom domain

Point the main domain to Vercel. A subdomain such as `api.orbisedg.com` can point to Render, or the frontend can continue using the Render hostname.

## Contact leads

The contact form saves enquiries to PostgreSQL. To view leads through the API:

```bash
curl -H "x-admin-key: YOUR_ADMIN_API_KEY" \
  http://localhost:4000/api/admin/leads
```

For production, build a private admin interface or connect the optional `CONTACT_WEBHOOK_URL` to an email, CRM, or automation service.

## Content

All supplied Orbisedg business content, service descriptions, case studies, metrics, testimonials, and imagery are included. Contact phone and social URLs remain intentionally absent because they were not supplied.
