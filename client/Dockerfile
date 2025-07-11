# Use official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock first for caching
COPY package.json package-lock.json* ./ 

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose default Next.js port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "run", "dev"]