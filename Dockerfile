FROM node:12-alpine
WORKDIR /usr/src/app

# Args
ARG NODE_ENV

# Set environment variables
ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=4000
ENV TZ=UTC

# Install base dependencies
RUN apk add --update build-base python git

# Install NPM dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy app and node_modules
COPY . .

# Build app
RUN yarn build

# Start Server
CMD [ "./node_modules/.bin/pm2-runtime", "node", "--", "build/server.js" ]
EXPOSE $SERVER_PORT