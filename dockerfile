FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=7777

EXPOSE 7777

CMD ["node", "server.js"]