#https://blog.logrocket.com/packaging-a-rust-web-service-using-docker/
ARG APP_NAME=framer-backend
ARG APP_NAME_UNDERSCORE=framer_backend

FROM rust:latest as builder

ARG APP_NAME
ARG APP_NAME_UNDERSCORE

RUN USER=root cargo new --bin $APP_NAME
WORKDIR /$APP_NAME

COPY ./Cargo.toml ./Cargo.toml
RUN cargo build --release

RUN rm src/*.rs
COPY ./src ./src

RUN rm ./target/release/deps/$APP_NAME_UNDERSCORE*
RUN cargo build --release

FROM rust:slim-buster

ARG APP_NAME
ENV APP=$APP_NAME

WORKDIR /app

COPY --from=builder /$APP_NAME/target/release/$APP_NAME ./$APP_NAME

EXPOSE 8080

CMD "./$APP"