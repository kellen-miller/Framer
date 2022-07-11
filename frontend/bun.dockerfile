ARG APP_NAME=framer-frontend
ARG APP_DIR=/usr/src/app
#docker run --rm --init --ulimit memlock=-1:-1 jarredsumner/bun:edge

FROM jarredsumner/bun:edge as deps

ARG APP_DIR
WORKDIR $APP_DIR

COPY ./package.json ./package.json
RUN ["/bin/bash", "-c", "source /root/.bashrc && bun install"]

FROM jarredsumner/bun:edge as builder

RUN apk add --update --no-cache nodejs-current

ARG APP_DIR
WORKDIR $APP_DIR

COPY . .
COPY --from=deps $APP_DIR/node_modules /node_modules

RUN ["/bin/bash", "-c", "source /root/.bashrc && bun run build"]

FROM jarredsumner/bun:edge as runner

ARG APP_NAME
ENV APP=$APP_NAME
ARG APP_DIR
WORKDIR $APP_DIR

ENV APP_USER=appuser

RUN addgroup -S $APP_USER \
    && adduser -S $APP_USER -G $APP_USER \
    && mkdir -p ${APP_DIR}

COPY --from=builder $APP_DIR/build $APP_DIR/$APP

EXPOSE 3000

CMD ["/bin/bash", "-c", "source /root/.bashrc && bun bun ${APP}server/index.js"]