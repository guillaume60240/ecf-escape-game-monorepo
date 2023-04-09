ARG BUILDPLATFORM=linux/amd64
ARG NODE_VERSION=18.12-alpine
ARG NGINX_VERSION=stable-alpine
ARG APP_VERSION=0.0.0


# app dependencies
FROM --platform=${BUILDPLATFORM} node:${NODE_VERSION} as package

WORKDIR /home/node/apps/back-end-api

RUN echo "copy package.json"
ADD ./apps/back-end-api/ ./

RUN echo "Install dependencies"
RUN npm install

COPY . .

RUN npm run build

# Start the server using the production build
CMD [ "node", "/home/node/apps/back-end-api/dist/main.js" ]