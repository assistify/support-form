FROM node:10 as builder

WORKDIR /app
COPY . /app
RUN npm ci && npm run build


FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
