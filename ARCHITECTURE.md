# DevTrackr Architecture

This document describes the full production architecture of the DevTrackr application.

## Overview

```
┌──────────────┐       HTTPS        ┌───────────────────┐       HTTP        ┌──────────────────┐
│              │ ─────────────────► │                   │ ────────────────► │                  │
│   Browser    │                    │   Vercel (Proxy)  │                   │  EC2 (Docker)    │
│              │ ◄───────────────── │   Next.js SSR     │ ◄──────────────── │  NestJS API      │
└──────────────┘                    └───────────────────┘                   └────────┬─────────┘
                                                                                     │
                                                                                     │ SSL/TCP 5432
                                                                                     ▼
                                                                           ┌──────────────────┐
                                                                           │   AWS RDS         │
                                                                           │   PostgreSQL      │
                                                                           └──────────────────┘
```

## 1. Frontend: Next.js (Vercel)

- **Framework:** Next.js 16 with React 19 and TypeScript
- **Hosting:** Vercel (automatic deployments from GitHub `main` branch)
- **Proxy:** API requests are proxied through Vercel rewrites (`/backend/*` → EC2) to avoid HTTPS → HTTP mixed content issues
- **UI:** Tailwind CSS + Shadcn/UI + Recharts for data visualization
- **Auth:** JWT tokens stored in localStorage with cookie sync for middleware
- **Environment Variables:**
  - `API_BACKEND_URL`: Server-side only. Points to EC2 IP for rewrite proxy.

## 2. Backend: NestJS API (AWS EC2)

- **Framework:** NestJS 11 with TypeScript
- **Hosting:** AWS EC2 (Ubuntu 24.04, t3.micro)
- **Containerization:** Docker (Node 22 Alpine with build tools for bcrypt)
- **ORM:** Prisma 7.5 with PostgreSQL adapter (`@prisma/adapter-pg`)
- **Auth:** JWT (Passport.js strategy) + bcrypt for password hashing
- **API Docs:** Swagger/OpenAPI at `/api`
- **Environment Variables (injected via `--env-file .env`):**
  - `DATABASE_URL`: RDS connection string with SSL (`sslmode=require&uselibpqcompat=true`)
  - `JWT_SECRET`: Secret key for JWT signing
  - `PORT`: API port (default: 3000)

## 3. Database: PostgreSQL (AWS RDS)

- **Service:** Amazon RDS PostgreSQL (db.t4g.micro, Free Tier)
- **Connection:** SSL encrypted (`sslmode=require` with libpq compatibility)
- **Schema:** Managed by Prisma ORM (migrations + `db push`)
- **Tables:** User, Income, Expense, Category

## 4. CI/CD Pipeline (GitHub Actions)

```
   Push to main
       │
       ▼
  ┌─────────┐     ┌───────────────────────────────────────┐
  │   CI    │────►│  Backend: install → generate → lint   │
  │         │     │           → build → test              │
  │         │     │  Frontend: install → build             │
  └────┬────┘     └───────────────────────────────────────┘
       │
       ▼ (on success)
  ┌─────────┐     ┌───────────────────────────────────────┐
  │   CD    │────►│  SSH to EC2 → git pull → docker build │
  │         │     │  → restart container → prisma db push  │
  └─────────┘     └───────────────────────────────────────┘
```

- **CI:** Runs on every push/PR to `main`. Verifies backend build, lint, and tests. Verifies frontend build.
- **CD:** Triggered automatically when CI passes. Deploys to EC2 via SSH using `appleboy/ssh-action`.

## Development vs Production

### Running Locally

- **Database:** Local PostgreSQL (via Docker Compose or native)
- **Backend:** `npm run start:dev` on `http://localhost:3000`
- **Frontend:** `npm run dev` on `http://localhost:3001`. Uses `/backend` proxy to `localhost:3000`.

### Running in Production

- **Database:** AWS RDS with SSL encryption
- **Backend:** Docker container on EC2, port 3000
- **Frontend:** Vercel with server-side rewrites proxying `/backend/*` to EC2
- **CI/CD:** GitHub Actions for automated testing and deployment