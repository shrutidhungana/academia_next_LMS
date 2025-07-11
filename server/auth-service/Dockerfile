# Base image with Node and Alpine (lightweight)
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package files first (for layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Start the built server
CMD ["npm", "start"]