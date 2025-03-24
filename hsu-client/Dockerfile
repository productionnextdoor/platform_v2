FROM nginx:latest
COPY ./* /usr/share/nginx/html
RUN mkdir -p /usr/share/nginx/html/assets
RUN mv /usr/share/nginx/html/appconfig.dev.json  /usr/share/nginx/html/assets
RUN mv /usr/share/nginx/html/appconfig.stage.json  /usr/share/nginx/html/assets
RUN mv /usr/share/nginx/html/appconfig.production.json  /usr/share/nginx/html/assets
RUN mv /usr/share/nginx/html/abp-web-resources  /usr/share/nginx/html/assets/abp-web-resources
RUN mv /usr/share/nginx/html/common  /usr/share/nginx/html/assets/common
