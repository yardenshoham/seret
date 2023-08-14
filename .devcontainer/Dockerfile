ARG VARIANT
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}
USER vscode
RUN curl -fsSL https://deno.land/x/install/install.sh | sh
RUN mkdir /home/vscode/.bashrc.d && chmod 700 /home/vscode/.bashrc.d
RUN /home/vscode/.deno/bin/deno completions bash > /home/vscode/.bashrc.d/90-deno && \
    echo 'export DENO_INSTALL="/home/vscode/.deno"' >> /home/vscode/.bashrc.d/90-deno && \
    echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> /home/vscode/.bashrc.d/90-deno
