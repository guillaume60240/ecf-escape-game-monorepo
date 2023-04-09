ARG NODE_VERSION=15.4
ARG NGINX_VERSION=1.19

# web-app dependencies & build the app
# ----------------------
FROM node:${NODE_VERSION} as builder
WORKDIR /app

COPY ./apps/web-app/package*.json .

RUN echo "Install dependencies"
RUN npm install
RUN echo "Build app"
COPY ./apps/web-app/ .
RUN npm run build

# production image
# ----------------
FROM  nginx:$NGINX_VERSION as production

COPY ./apps/web-app/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
