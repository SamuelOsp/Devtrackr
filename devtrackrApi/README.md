# DevTrackr API

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

## Live Demo

- **Frontend:** https://devtrackr.vercel.app (update with real URL)
- **Backend:** http://EC2_PUBLIC_IP (update with real IP)
- **API Docs:** http://EC2_PUBLIC_IP/api (Swagger)

## 📖 Overview

**DevTrackr API** is the core backend for DevTrackr, a platform designed for developers and professionals to keep detailed track of their finances and income.

This API is built with **NestJS** and follows a modular, scalable, and robust architecture geared towards production environments, ensuring development best practices, consistent responses, and a high level of security.

## ✨ Key Features

- **Professional & Secure Authentication:** Implemented with JWT (JSON Web Tokens), securing sensitive routes and hashing passwords using `bcrypt`. Secure user context extraction via custom decorators (like `@CurrentUser()`).
- **Income Management:** Dedicated endpoints to register, query, and manage income records, strictly validating data ownership to prevent unauthorized access to other users' data.
- **Relational Database:** Declarative and strictly typed data modeling managed via **Prisma ORM** with a **PostgreSQL** database.
- **Clean Architecture & Enterprise Standards:**
  - Utilization of `DTO` (Data Transfer Objects) classes with `class-validator` for data input validation.
  - Interceptors (`ResponseInterceptor`) to enforce a consistent response structure.
  - Global exception filters (`HttpExceptionFilter`) to deliver clear and formatted error messages.

## 🛠️ Tech Stack

- **Core Framework:** [NestJS](https://nestjs.com/) v11
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Security:** Passport.js, JWT, Bcrypt
- **Validation & Structure:** `class-validator`, `class-transformer`

## 🚀 Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/en/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) (package manager)
- A running instance of [PostgreSQL](https://www.postgresql.org/).

## ⚙️ Project Setup

1. **Clone the repository and go to the project directory:**
   ```bash
   git clone <repository-url>
   cd devtrackrApi
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory (you can use `.env.example` as a template if available).
   - Required variables (example):
     ```env
     DATABASE_URL="postgresql://user:password@localhost:5432/devtrackr?schema=public"
     JWT_SECRET="your_super_jwt_secret_here"
     ```

4. **Apply database migrations:**
   ```bash
   npx prisma migrate dev
   ```

## 💻 Compile and Run

The project is configured to run in different environments the traditional NestJS way:

```bash
# start the application for development
npm run start

# start the application in watch mode (highly recommended for development)
npm run start:dev

# build the project and start in production mode
npm run build
npm run start:prod
```

## 🧪 Testing

The system is designed with testing in mind to guarantee future maintainability.

```bash
# run unit tests
npm run test

# run unit tests in interactive/watch mode
npm run test:watch

# generate test coverage report
npm run test:cov
```

## 📄 Core Project Structure

The main source code directory (`src/`) is organized into domains and shared infrastructure:

- `src/modules/auth/`: Complete authentication logic (register, login, JWT strategy validation, and guards).
- `src/modules/income/`: Management and tracking of user income records.
- `src/common/` *(or config/utils/)*: Global utilities like consistency interceptors, exception filters, global decorators, and configurations.
