ARG BUILDPLATFORM=linux/amd64
ARG NODE_VERSION=18.12-alpine
ARG NGINX_VERSION=stable-alpine
ARG APP_VERSION=0.0.0

# app dependencies
FROM --platform=${BUILDPLATFORM} node:${NODE_VERSION} as package
WORKDIR /home/node/apps/mobile-app

RUN echo "Install dependencies"
ADD ./apps/mobile-app/ ./
RUN npm install

# build ionic app
FROM package as builder
ARG ENVIRONMENT=production
WORKDIR /home/node/apps/mobile-app

RUN cp .env .env.local || cp .env.dist .env.local
RUN echo "Build app"
RUN npm run build

# build capacitor app
FROM builder as capacitor
ARG ENVIRONMENT=production
WORKDIR /home/node/apps/mobile-app
RUN echo "Build capacitor app"
RUN npm run capacitor:build

# production image
FROM --platform=${BUILDPLATFORM} nginx:$NGINX_VERSION as production
ARG APP_VERSION
WORKDIR /app
ENV APP_VERSION=${APP_VERSION}
ENV APP_NAME=mobile-app

RUN sed -i '1idaemon off;' /etc/nginx/nginx.conf
ADD ./docker/spa.nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/node/apps/mobile-app/dist/ ./

EXPOSE 80
CMD ["nginx"]