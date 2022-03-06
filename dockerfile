<<<<<<< HEAD
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

=======
FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
>>>>>>> 242489162645e17afbc945344cef757b702c71a4
COPY . .
EXPOSE 7777
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
