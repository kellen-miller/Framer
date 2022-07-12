ARG APP_NAME=framer-frontend

FROM node:alpine as deps

ARG APP_NAME
WORKDIR /$APP_NAME

COPY package.json ./

RUN npm install

FROM node:alpine as builder

ARG APP_NAME
WORKDIR /$APP_NAME

COPY . .
COPY --from=deps /$APP_NAME .

RUN npm run prepare
RUN npm run build

FROM node:alpine as server

ARG APP_NAME
ENV APP=$APP_NAME
USER node:node
WORKDIR /$APP_NAME

COPY --from=builder --chown=node:node /$APP_NAME/package.json .
COPY --from=builder --chown=node:node /$APP_NAME/node_modules ./node_modules
COPY --from=builder --chown=node:node /$APP_NAME/build ./build

ENV PORT 3000
EXPOSE 3000

CMD ["node", "build"]