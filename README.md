<div align="center">

# 💰 DevTrackr

**A full-stack personal finance tracking SaaS application**

Built with modern technologies and deployed on AWS cloud infrastructure.

[![CI](https://github.com/SamuelOsp/Devtrackr/actions/workflows/ci.yml/badge.svg)](https://github.com/SamuelOsp/Devtrackr/actions/workflows/ci.yml)
[![CD](https://github.com/SamuelOsp/Devtrackr/actions/workflows/cd.yml/badge.svg)](https://github.com/SamuelOsp/Devtrackr/actions/workflows/cd.yml)

[🚀 Live Demo](https://devtrackr-iota.vercel.app) · [📖 API Docs](http://18.221.134.161:3000/api) · [🐛 Report Bug](https://github.com/SamuelOsp/Devtrackr/issues)

</div>

---

## 📸 Screenshots

<!-- Add your screenshots here -->
<!-- ![Dashboard](./docs/screenshots/dashboard.png) -->
<!-- ![Login](./docs/screenshots/login.png) -->
<!-- ![Swagger](./docs/screenshots/swagger.png) -->

> 📌 *Screenshots coming soon*

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS, Recharts, Shadcn/UI |
| **Backend** | NestJS 11, TypeScript, Prisma ORM, Passport JWT, Swagger/OpenAPI |
| **Database** | PostgreSQL (AWS RDS) |
| **Infrastructure** | AWS EC2, Docker, Vercel |
| **CI/CD** | GitHub Actions |
| **Auth** | JWT + bcrypt |

---

## ⚙️ Architecture

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

**Key design decisions:**

- **Vercel Proxy**: Frontend proxies API requests server-side to avoid HTTPS → HTTP mixed content issues
- **Docker**: Backend containerized for environment consistency across dev and production
- **AWS RDS**: Managed PostgreSQL with automatic backups and SSL encryption
- **JWT Auth**: Stateless authentication with bcrypt password hashing

---

## 🔐 Features

- ✅ **User Authentication** — Register, login, and JWT-protected routes
- ✅ **Income Management** — Create, read, update, and delete income records
- ✅ **Expense Tracking** — Categorized expense management with CRUD operations
- ✅ **Financial Dashboard** — Visual charts and summary of your finances
- ✅ **Categories** — Organize expenses by customizable categories
- ✅ **API Documentation** — Full Swagger/OpenAPI docs at `/api`
- ✅ **CI/CD Pipeline** — Automated testing, building, and deployment
- ✅ **Cloud Deployment** — Production-ready AWS infrastructure

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL (local or Docker)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/SamuelOsp/Devtrackr.git
cd Devtrackr
```

### 2. Backend Setup

```bash
cd devtrackrApi
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/devtrackr?schema=public
JWT_SECRET=your_jwt_secret
PORT=3000
```

Run the database migration and start the server:

```bash
npx prisma db push
npm run start:dev
```

The API will be available at `http://localhost:3000` and Swagger at `http://localhost:3000/api`.

### 3. Frontend Setup

```bash
cd devtrackr-web
npm install
npm run dev
```

The frontend will be available at `http://localhost:3001`.

---

## 🧪 Running Tests

```bash
cd devtrackrApi
npm run test        # Unit tests
npm run test:cov    # With coverage
```

---

## 📁 Project Structure

```
devtrackr/
├── .github/workflows/     # CI/CD pipelines
│   ├── ci.yml             # Build, lint, test
│   └── cd.yml             # Auto-deploy to EC2
├── devtrackrApi/           # NestJS Backend
│   ├── src/
│   │   ├── modules/       # Feature modules (auth, income, expenses, etc.)
│   │   ├── common/        # Filters, interceptors, decorators
│   │   ├── config/        # App configuration
│   │   └── infrastructure/ # Database (Prisma)
│   ├── prisma/            # Schema & migrations
│   └── Dockerfile         # Production container
├── devtrackr-web/          # Next.js Frontend
│   ├── src/
│   │   ├── app/           # Pages (dashboard, auth, income, expenses)
│   │   ├── components/    # Reusable UI components
│   │   ├── services/      # API client (axios)
│   │   └── hooks/         # Custom React hooks
│   └── next.config.ts     # Proxy rewrites config
└── ARCHITECTURE.md         # Detailed architecture docs
```

---

## 🧠 What I Learned

Building DevTrackr from scratch taught me real-world engineering skills that go beyond tutorials:

- **Cloud Infrastructure**: Provisioning and configuring AWS EC2 + RDS, managing Security Groups, and handling SSL certificates
- **Docker in Production**: Debugging container issues (bcrypt native compilation, Prisma client generation, correct entry points)
- **CI/CD Pipelines**: Setting up GitHub Actions for automated testing and deployment via SSH
- **Network Security**: Solving HTTPS/HTTP mixed content issues with server-side proxying
- **Database Management**: Prisma ORM migrations, SSL connections to RDS, and production data seeding
- **Full Stack Integration**: Connecting a Next.js frontend on Vercel to a NestJS API on EC2 through a secure proxy

---

## 📄 License

This project is for educational and portfolio purposes.

---

<div align="center">

**Built with ❤️ by [Samuel Ospina](https://github.com/SamuelOsp)**

</div>
