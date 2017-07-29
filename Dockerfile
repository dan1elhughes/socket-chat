FROM node:8-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .

# For npm@5 or later, copy package-lock.json as well
COPY package.json .

# Install dependencies
RUN npm set progress=false && \
	npm install -s --no-progress && \
	npm prune --production

# Bundle app source
COPY . .

# Set port for server
ENV PORT 3000
EXPOSE $PORT

CMD [ "npm", "start" ]
