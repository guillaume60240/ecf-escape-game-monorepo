ARG NODE_VERSION=15.4
ARG NGINX_VERSION=1.19

# web-app dependencies & build the app
# ----------------------
FROM node:${NODE_VERSION} as builder
WORKDIR /app

RUN echo ls -la

ADD package*.json .

RUN echo "Install dependencies"
RUN npm install
RUN echo "Build app"
COPY . .
RUN npm run build

# production image
# ----------------
FROM  nginx:$NGINX_VERSION as production

ADD nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
