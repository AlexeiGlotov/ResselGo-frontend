FROM node:alpine3.19 AS react-build

COPY . /resselgo/frontapp/
WORKDIR /resselgo/frontapp/
RUN npm install
RUN npm run build

FROM nginx:alpine AS react-nginx
COPY --from=react-build /resselgo/frontapp/build /usr/share/nginx/html
EXPOSE 80
