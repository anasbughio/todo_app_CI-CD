# Stage 1 - Build frontend
FROM node:18 as build

WORKDIR /app

COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Stage 2 - Backend
FROM node:18

WORKDIR /app

COPY Backend ./Backend
WORKDIR /app/Backend
RUN npm install

# Copy frontend build to backend public folder
COPY --from=build /app/frontend/build ./public

EXPOSE 5000

CMD ["node", "server.js"]