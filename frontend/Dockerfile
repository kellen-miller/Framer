ARG APP_NAME=framer-frontend

FROM node:latest as deps

ARG APP_NAME
WORKDIR /$APP_NAME

COPY package.json ./

RUN npm install

FROM node:latest as builder

ARG APP_NAME
WORKDIR /$APP_NAME

COPY . .
COPY --from=deps /$APP_NAME .

RUN npm run prepare
RUN npm run build

FROM node:alpine as server

ARG APP_NAME
ARG APP_USER=librarian
WORKDIR /$APP_NAME
ENV APP=$APP_NAME

USER $APP_USER:$APP_USER

COPY --from=builder --chown=APP_USER:APP_USER /$APP_NAME/package.json .
COPY --from=builder --chown=APP_USER:APP_USER /$APP_NAME/node_modules ./node_modules
COPY --from=builder --chown=APP_USER:APP_USER /$APP_NAME/build ./build

EXPOSE 3000

CMD ["node", "build"]