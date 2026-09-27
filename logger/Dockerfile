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


# Production build
FROM base AS builder

RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build


# Production
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]