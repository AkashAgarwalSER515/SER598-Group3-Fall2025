# Build Stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files first
COPY package.json package-lock.json ./

# Install dependencies (tailwind will install here)
RUN npm ci

# Copy project source
COPY . .

# Build Vite project
RUN npm run build


# ---- Production Stage ----
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
