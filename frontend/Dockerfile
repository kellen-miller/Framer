ARG APP_NAME=framer-frontend

FROM node:alpine as deps

ARG APP_NAME
WORKDIR /$APP_NAME

COPY ./package.json ./package.json

RUN npm install

FROM node:alpine as builder

ARG APP_NAME
WORKDIR /$APP_NAME

COPY . .
COPY --from=deps /$APP_NAME/node_modules /node_modules
COPY --from=deps /$APP_NAME/package*.json ./

RUN npm ci
RUN npm audit fix
RUN npm run build

FROM node:alpine as runner

ARG APP_NAME
ENV APP=$APP_NAME

WORKDIR /$APP_NAME

COPY --from=builder /$APP_NAME/package*.json ./
COPY --from=builder /$APP_NAME/build ./

EXPOSE 3000

CMD ["node", "./index.js"]