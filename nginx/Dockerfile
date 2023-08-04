FROM nginx:1.15.0-alpine

# removing default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# inserting a new nginx.conf file to be used
COPY nginx.conf /etc/nginx/conf.d

