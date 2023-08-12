FROM denoland/deno

USER deno

WORKDIR /usr/src/app

COPY . .

RUN deno cache server.ts

ENTRYPOINT [ "deno", "task", "start" ]