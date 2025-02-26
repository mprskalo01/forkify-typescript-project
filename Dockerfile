# syntax=docker/dockerfile:1

ARG NODE_VERSION=23.5.0

# Use node image for all build steps
FROM node:${NODE_VERSION}-alpine as base

# Set working directory
WORKDIR /usr/src/app

# Ensure necessary directories exist with proper permissions
RUN mkdir -p /usr/src/app/.parcel-cache && chown -R node:node /usr/src/app

# Use non-root user for security
USER node

################################################################################
# Install dependencies
FROM base AS deps

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

################################################################################
# Build the application
FROM deps AS build

# Copy source files and build project
COPY . .
RUN npm run build

################################################################################
# Serve the application using nginx
FROM nginx:alpine as final

# Copy built static files from the build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 for serving static content
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
