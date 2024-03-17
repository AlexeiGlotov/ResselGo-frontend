FROM node:alpine3.19 AS react-build

COPY frontapp /recurro/frontapp/
WORKDIR /recurro/frontapp/
RUN npm install
RUN npm run build

FROM nginx:alpine AS react-nginx
COPY --from=react-build /recurro/frontapp/build /usr/share/nginx/html
EXPOSE 80
