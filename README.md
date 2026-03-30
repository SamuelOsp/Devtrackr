# DevTrackr API

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

## 📖 Descripción general

**DevTrackr API** es el backend principal para DevTrackr, una plataforma diseñada para que los desarrolladores y profesionales puedan llevar un control detallado de sus finanzas e ingresos.

Esta API está construida con **NestJS** y sigue una arquitectura modular, escalable y robusta orientada a un entorno de producción, asegurando buenas prácticas de desarrollo, consistencia en las respuestas y un alto nivel de seguridad.

## ✨ Características principales

- **Autenticación Profesional y Segura:** Implementada con JWT (JSON Web Tokens), protegiendo rutas sensibles y cifrando las contraseñas con `bcrypt`. Extracción segura del contexto del usuario mediante decoradores personalizados (como `@CurrentUser()`).
- **Gestión de Ingresos:** Endpoints dedicados para registrar, consultar y administrar los ingresos, validando estrictamente la propiedad de la información para prevenir el acceso no autorizado a los datos de otros usuarios.
- **Base de Datos Relacional:** Modelado de datos declarativo y fuertemente tipado manejado a través de **Prisma ORM** y una base de datos **PostgreSQL**.
- **Arquitectura Limpia y Estándares Enterprise:**
  - Uso de clases `DTO` (Data Transfer Objects) con `class-validator` para validad la entrada de datos.
  - Interceptores (`ResponseInterceptor`) para devolver una estructura de respuesta siempre consistente.
  - Filtros de excepciones globales (`HttpExceptionFilter`) para entregar mensajes de error claros y formateados.

## 🛠️ Tecnologías utilizadas

- **Framework principal:** [NestJS](https://nestjs.com/) v11
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Base de datos:** [PostgreSQL](https://www.postgresql.org/)
- **Seguridad:** Passport.js, JWT, Bcrypt
- **Validación y Estructura:** `class-validator`, `class-transformer`

## 🚀 Requisitos previos

Antes de comenzar, asegúrate de tener instalado en tu sistema local:
- [Node.js](https://nodejs.org/en/) (versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/) (gestor de paquetes)
- Una instancia de [PostgreSQL](https://www.postgresql.org/) en ejecución.

## ⚙️ Configuración del proyecto

1. **Clonar el repositorio e ingresar al directorio:**
   ```bash
   git clone <url-del-repositorio>
   cd devtrackrApi
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   - Si no existe, crea un archivo `.env` en la raíz del proyecto tomando como base un posible `.env.example`.
   - Variables requeridas obligatorias (ejemplo):
     ```env
     DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/devtrackr?schema=public"
     JWT_SECRET="tu_super_secreto_aqui_para_jwt"
     ```

4. **Aplicar migraciones a la base de datos:**
   ```bash
   npx prisma migrate dev
   ```

## 💻 Compilación y ejecución

El proyecto está configurado para ejecutarse en diferentes entornos de la manera tradicional en NestJS:

```bash
# iniciar la aplicación para desarrollo
npm run start

# iniciar la aplicación con hot-reload (muy recomendado en desarrollo)
npm run start:dev

# empaquetar e iniciar en modo producción
npm run build
npm run start:prod
```

## 🧪 Pruebas

El sistema prevé el uso de pruebas para garantizar el mantenimiento a futuro.

```bash
# ejecutar las pruebas unitarias
npm run test

# ejecutar las pruebas unitarias en modo interactivo/watch
npm run test:watch

# generar reporte de cobertura de código
npm run test:cov
```

## 📄 Estructura del proyecto principal

El directorio de código fuente principal (`src/`) se organiza en dominios e infraestructura compartida:

- `src/modules/auth/`: Lógica de autenticación completa (registro, login, validación de estrategias JWT y guards).
- `src/modules/income/`: Gestión del seguimiento de los ingresos de los usuarios.
- `src/common/` *(o config/utils/)*: Utilidades globales como interceptores de consistencia, filtros de excepciones, decoradores globales y configuración.
