# Dockerfile
FROM node:20.10-alpine3.17

WORKDIR /websocket

COPY . /websocket

COPY package.json ./

RUN npm install

EXPOSE 3000
CMD npm start
