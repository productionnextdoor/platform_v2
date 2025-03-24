FROM node:18-alpine
WORKDIR /app

ENV ROOT_DIR="/app"

RUN npm install -g @angular/cli

COPY ./docker-entry.sh /entry.sh
RUN chmod +x /entry.sh

ENTRYPOINT ["/bin/sh","-c","/entry.sh"]
