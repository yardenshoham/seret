FROM denoland/deno
WORKDIR /tmp
COPY update-script.sh .
RUN apt-get update && bash /tmp/update-script.sh
