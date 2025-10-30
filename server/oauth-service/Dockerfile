# Dockerfile (server/oauth-service/Dockerfile)

# 1. Base image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and lockfile first (for caching)
COPY package.json package-lock.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the source code
COPY . .

# 6. Build TypeScript
RUN npm run build

# 7. Expose port
EXPOSE 5100

# 8. Start container: generate Prisma client, run migrations, start server
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm run start:prod"]
