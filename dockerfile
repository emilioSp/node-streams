FROM alpine:3.16

ARG NODE_ENV=$NODE_ENV

RUN apk add nodejs yarn curl

COPY ./ /opt
WORKDIR /opt

RUN if [ "$NODE_ENV" != "development" ]; then \
      yarn install --production && \
      yarn cache clean; \
    fi

CMD yarn serve
