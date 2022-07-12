ARG APP_NAME=framer-frontend
#docker run --rm --init --ulimit memlock=-1:-1 jarredsumner/bun:edge

FROM jarredsumner/bun:edge as deps

ARG APP_NAME
WORKDIR /$APP_NAME

COPY package.json ./
RUN ["/bin/bash", "-c", "source /root/.bashrc && bun install"]

FROM jarredsumner/bun:edge as builder

RUN apk add --update --no-cache nodejs-current

ARG APP_NAME
WORKDIR /$APP_NAME

COPY . .
COPY --from=deps /$APP_NAME .

RUN ["/bin/bash", "-c", "source /root/.bashrc && bun run build"]

FROM jarredsumner/bun:edge as server

ARG APP_NAME
WORKDIR /$APP_NAME
ENV APP=$APP_NAME


COPY --from=builder /$APP_NAME/package.json .
COPY --from=builder /$APP_NAME/node_modules ./node_modules
COPY --from=builder /$APP_NAME/build ./build

EXPOSE 3000

CMD ["/bin/bash", "-c", "source /root/.bashrc && bun build/index.js"]