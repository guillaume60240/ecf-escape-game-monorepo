ARG BUILDPLATFORM=linux/amd64
ARG NODE_VERSION=18.12-alpine
ARG APP_VERSION=0.0.0

# back-end-api dependencies & build the app
# ---------------------------
FROM --platform=${BUILDPLATFORM} node:${NODE_VERSION} as builder
WORKDIR /home/node/apps/back-end-api

RUN echo "Install dependencies"
ADD ./apps/back-end-api/ ./
RUN npm install


RUN cp .env .env.local || cp .env.dist .env.local
RUN echo "Build app"
RUN npm run build
RUN ls 
# production image
# ----------------
FROM --platform=${BUILDPLATFORM} node:${NODE_VERSION} as production
ARG APP_VERSION
ENV NODE_ENV=production
ENV APP_VERSION=${APP_VERSION}
ENV APP_NAME=back-end-api

WORKDIR /home/node/apps/back-end-api
COPY --chown=node:node --from=builder /home/node/apps/back-end-api/package.json ./
COPY --chown=node:node --from=builder /home/node/apps/back-end-api/dist/ ./dist/
COPY --chown=node:node --from=builder /home/node/apps/back-end-api/node_modules/ ./node_modules/

RUN echo "production"
RUN ls /home/node/apps/back-end-api 
#RUN cd /home/node/apps/back-end-api 

EXPOSE 3000
CMD ["node", "dist/main.js"]