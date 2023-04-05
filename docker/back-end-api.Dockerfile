ARG BUILDPLATFORM=linux/amd64
ARG NODE_VERSION=18.12-alpine
ARG APP_VERSION=0.0.0

# app dependencies
FROM --platform=${BUILDPLATFORM} node:${NODE_VERSION} as package
WORKDIR /home/node/apps/back-end-api

RUN echo "Install dependencies"
ADD ./apps/back-end-api/ ./
RUN npm install

# clean dev dependencies and cache
# note: keep at least a node_modules folder.
# ------------------------------------------
#FROM builder as cleaned
#RUN echo "Clean dev dependencies and cache"
#RUN npm prune --production
#RUN npm cache clean --force

# build app
# ---------
FROM package as builder
ARG ENVIRONMENT=production
WORKDIR /home/node/apps/back-end-api

RUN cp .env .env.local || cp .env.dist .env.local
RUN echo "Build app"
RUN npm run build

# production image
# ----------------
FROM --platform=${BUILDPLATFORM} node:${NODE_VERSION} as production
ARG APP_VERSION
ENV NODE_ENV=production
ENV APP_VERSION=${APP_VERSION}
ENV APP_NAME=back-end-api

USER node
WORKDIR /home/node/apps/back-end-api
COPY --chown=node:node --from=package /home/node/apps/back-end-api/package.json ./

CMD ["npm", "run", "start:prod"]