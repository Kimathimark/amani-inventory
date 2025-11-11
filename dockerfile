# =============================
# Stage 1: Build React App
# =============================
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
# This helps Docker cache dependencies if package files haven't changed
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy all source code
COPY . .

# Build the React app for production
RUN npm run build

# =============================
# Stage 2: Serve with Nginx
# =============================
FROM nginx:stable-alpine

# Copy built app from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Optional: Custom Nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
