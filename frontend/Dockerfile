ARG APP_NAME=framer-frontend

FROM node:latest as deps

ARG APP_NAME
WORKDIR /$APP_NAME

COPY package.json ./

RUN npm install --force

FROM node:latest as builder

ARG APP_NAME
WORKDIR /$APP_NAME

COPY . .
COPY --from=deps /$APP_NAME .

RUN npm run prepare
RUN npm run build

FROM node:alpine as server

ARG APP_NAME
WORKDIR /$APP_NAME
ENV APP=$APP_NAME

COPY --from=builder /$APP_NAME/package.json .
COPY --from=builder /$APP_NAME/node_modules ./node_modules
COPY --from=builder /$APP_NAME/build ./build

RUN sed -i 's|compression$1.exports({ threshold: 0 })|//compression$1.exports({ threshold: 0 })|g' build/index.js

EXPOSE 3000

CMD ["node", "build"]