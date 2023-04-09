ARG BUILDPLATFORM=linux/amd64
ARG NODE_VERSION=18.12-alpine
ARG NGINX_VERSION=stable-alpine
ARG APP_VERSION=0.0.0

# web-app dependencies & build the app
# ----------------------
FROM --platform=${BUILDPLATFORM} node:${NODE_VERSION} as builder
WORKDIR /app

COPY . .

RUN echo "Install dependencies"
RUN npm install
RUN echo "Build app"
RUN npm run build

# production image
# ----------------
FROM --platform=${BUILDPLATFORM} nginx:$NGINX_VERSION as production
ARG APP_VERSION
ENV APP_VERSION=${APP_VERSION}
ENV APP_NAME=web-app

WORKDIR /app

RUN sed -i '1idaemon off;' /etc/nginx/nginx.conf

COPY --from=builder /app/dist/ ./usr/share/nginx/html

EXPOSE 80
CMD ["nginx"]
