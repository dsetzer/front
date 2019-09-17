# build environment
FROM node:12.6.0 as build
RUN apt-get -y update \
	&& apt-get install -y git
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app
RUN npm install
RUN npm install @vue/cli@3.7.0 -g
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]