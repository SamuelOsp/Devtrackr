# DevTrackr Architecture

This document describes the full production architecture of the DevTrackr application.

## Overview

The application follows a standard three-tier architecture:

`Frontend (Vercel)` → `Backend (AWS EC2 + Docker + Nginx)` → `Database (AWS RDS PostgreSQL)`

### 1. Frontend: Next.js (Vercel)

- **Why Vercel:** Vercel is the creator of Next.js and provides the most optimized hosting environment for it. It offers out-of-the-box CDN caching, automatic CI/CD from Git, zero-downtime deployments, and edge network optimizations.
- **Connection:** The frontend communicates with the backend API via HTTP requests using `axios`.
- **Environment Variables:**
  - `NEXT_PUBLIC_API_URL`: Points to the public IP of the EC2 instance (e.g., `http://EC2_PUBLIC_IP`).

### 2. Backend: NestJS API (AWS EC2)

- **Why AWS EC2:** Offers full control over the host server, which is useful for learning, custom deployments, and running Docker containers reliably within the AWS Free Tier.
- **Docker:** The API is containerized using Docker, ensuring environment consistency between local development and production.
- **Nginx:** Acts as a reverse proxy on the EC2 instance, listening on port 80 and forwarding traffic to the NestJS container running on port 3000. It also provides a layer of security and can be easily configured for HTTPS/SSL in the future.
- **Environment Variables:**
  - `DATABASE_URL`: Connection string for the RDS instance.
  - `JWT_SECRET`: Secret key used for signing JSON Web Tokens.
  - `PORT`: Exposed port (default: 3000).

### 3. Database: PostgreSQL (AWS RDS)

- **Why AWS RDS:** Managed relational database service that handles backups, software patching, automatic failure detection, and recovery. Free tier eligible for PostgreSQL.
- **Connection:** The backend connects to RDS using Prisma ORM via the `DATABASE_URL` environment variable.

## Development vs Production

### Running Locally

- **Database:** Uses a local PostgreSQL database (e.g., via Docker Compose or native installation).
- **Backend:** Runs locally on `http://localhost:3000` via `npm run start:dev`.
- **Frontend:** Runs locally on `http://localhost:3001` via `npm run dev`. `NEXT_PUBLIC_API_URL` defaults to `http://localhost:3000`.

### Running in Production

- **Database:** Hosted on AWS RDS.
- **Backend:** Runs as a Docker container on an AWS EC2 instance. Traffic is routed via Nginx on port 80.
- **Frontend:** Hosted on Vercel. `NEXT_PUBLIC_API_URL` is set in the Vercel dashboard to point to the EC2 public IP.