FROM node:12 AS build

# Create app directory
WORKDIR /usr/src/app

COPY src ./src/
COPY e2e ./e2e/
COPY angular.json .
COPY karma.conf.js .
COPY package.json .
COPY package-lock.json .
COPY tsconfig.app.json .
COPY tsconfig.json .
COPY tsconfig.spec.json .
COPY tslint.json .

RUN npm install
RUN npm run build


FROM nginx:1.19.6-alpine
COPY docker-entrypoint.sh /
COPY nginx_angular_default_config /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /var/www/
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
