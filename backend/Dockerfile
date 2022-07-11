#https://blog.logrocket.com/packaging-a-rust-web-service-using-docker/
ARG APP_NAME=framer-backend
ARG APP_NAME_UNDERSCORE=framer_backend

FROM rust:latest as build

ARG APP_NAME
ARG APP_NAME_UNDERSCORE

RUN USER=root cargo new --bin $APP_NAME
WORKDIR /$APP_NAME

COPY ./Cargo.toml ./Cargo.toml
RUN cargo build --release

RUN rm src/*.rs
COPY ./src ./src

RUN rm ./target/release/deps/${APP_NAME_UNDERSCORE}*
RUN cargo build --release

FROM rust:slim-buster
ARG APP_NAME
ARG APP_DIR=/usr/src/app
ENV APP=$APP_NAME
ENV APP_USER=appuser

RUN groupadd $APP_USER \
    && useradd -g $APP_USER $APP_USER \
    && mkdir -p ${APP_DIR}

COPY --from=build /${APP_NAME}/target/release/${APP_NAME} ${APP_DIR}/${APP_NAME}

RUN chown -R $APP_USER:$APP_USER ${APP_DIR}

USER $APP_USER
WORKDIR ${APP_DIR}

CMD "./${APP}"