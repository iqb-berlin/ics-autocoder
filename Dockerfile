FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY src /app/src
COPY specs /app/specs

RUN npm install
RUN npm run build

FROM node:22-bookworm-slim

RUN mkdir /app
RUN mkdir /app/data
RUN mkdir /app/data/data

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/src/main.js"]

EXPOSE 3000
