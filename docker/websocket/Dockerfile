FROM node:20.10-alpine3.17

ARG FORWARD_SOCKET_PORT

WORKDIR /websocket

# Copy package.json and package-lock.json first to leverage Docker cache
COPY ./docker/websocket/package*.json ./

# Install npm dependencies
RUN npm install

# Move up one level to the parent directory and copy .env
COPY ./.env ./

# Copy the rest of the application files
COPY ./docker/websocket/ ./

# Expose the port
EXPOSE ${FORWARD_SOCKET_PORT}
CMD npm start
