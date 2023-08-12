FROM denoland/deno

USER deno

WORKDIR /usr/src/app

COPY . .

ENTRYPOINT [ "deno", "task", "start" ]