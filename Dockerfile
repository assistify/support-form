FROM node:10 as builder

WORKDIR /app
COPY . /app
RUN npm ci && npm run build


FROM node:10
WORKDIR /app
COPY --from=builder /app/dist dist
COPY package.json package-lock.json LICENSE /app/
RUN npm ci --production

USER node
EXPOSE 8080
CMD [ "npm", "start" ]
