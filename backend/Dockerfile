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

FROM rust:slim-buster as server

ARG APP_NAME
ARG APP_USER=rusty
WORKDIR /app
ENV APP=$APP_NAME

RUN groupadd $APP_USER && useradd -g $APP_USER $APP_USER
COPY --from=builder /$APP_NAME/target/release/$APP_NAME ./$APP_NAME
RUN chown -R $APP_USER:$APP_USER ./$APP_NAME
USER $APP_USER

EXPOSE 8080

CMD "./$APP"