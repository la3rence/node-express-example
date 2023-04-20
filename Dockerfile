FROM node:20

# Create app directory
WORKDIR /usr/src/app

ENV NODE_ENV=PRODUCTION
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# building your code for production
RUN npm ci --only=production --ignore-scripts

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
