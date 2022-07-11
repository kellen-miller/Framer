ARG APP_NAME=framer-frontend

#docker run --rm --init --ulimit memlock=-1:-1 jarredsumner/bun:edge

FROM node:latest as deps

ARG APP_NAME
WORKDIR /$APP_NAME

COPY ./package.json ./package.json
RUN npm install

FROM node:latest as builder

ARG APP_NAME
WORKDIR /$APP_NAME

COPY . .
COPY --from=deps $APP_NAME/node_modules /node_modules

RUN npm run build

FROM node:alpine as runner

ARG APP_NAME
ARG APP_DIR=/usr/src/app
ENV APP=$APP_NAME
ENV APP_USER=appuser


RUN addgroup -S $APP_USER \
    && adduser -S $APP_USER -G $APP_USER \
    && mkdir -p $APP_DIR

COPY --from=builder /$APP_NAME/build $APP_DIR/$APP_NAME

RUN chown -R $APP_USER:$APP_USER $APP_DIR

USER $APP_USER
WORKDIR $APP_DIR
EXPOSE 3000

#CMD "node ./${APP}/index.js"
