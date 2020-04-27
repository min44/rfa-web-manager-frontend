FROM tiangolo/node-frontend:10 as build-stage

ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json
ADD tsconfig.json /app/tsconfig.json

WORKDIR /app

COPY src /app/src
COPY public /app/public
COPY material-ui-dropzone /app/material-ui-dropzone

RUN npm install \
    && npm run build

FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
