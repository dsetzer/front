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
