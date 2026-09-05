# Base
FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./


# Development
FROM base AS development

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]


# Production dependencies
FROM base AS deps

RUN npm ci


# Production build
FROM deps AS builder

COPY . .

RUN npm run build


# Production
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
