FROM node:22-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG DATABASE_URL="postgresql://postgres:dummy@localhost:5432/dummy"
RUN DATABASE_URL="${DATABASE_URL}" npx prisma generate && npm run build

EXPOSE 3000

CMD ["node", "dist/src/main"]