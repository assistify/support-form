FROM node:10 as builder

WORKDIR /app
COPY . /app
RUN npm ci && npm run build


FROM nginx:alpine
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
COPY --from=builder /app/dist /usr/share/nginx/html
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf
RUN sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf
EXPOSE 8080
