# ---------- Builder ----------
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

# คัดลอก source ทั้งหมด (จะถูกกรองด้วย .dockerignore)
COPY . .

# build: tsc และคัดลอก views/public เข้าสู่ dist ตามสคริปต์ของคุณ
RUN npm run build

COPY src/views ./dist/views
COPY public    ./dist/public

# ---------- Production ----------
FROM node:18-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

# signal handling
RUN apk add --no-cache dumb-init

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# เอา artefacts ที่ build แล้วมา
COPY --from=builder /app/dist ./dist

# non-root user
RUN addgroup -g 1001 -S nodejs \
 && adduser -S appuser -u 1001 -G nodejs \
 && mkdir -p ./dist/public/uploads \
 && chown -R appuser:nodejs /app

USER appuser
EXPOSE 3000

ENTRYPOINT ["dumb-init","--"]
CMD ["npm","start"]
