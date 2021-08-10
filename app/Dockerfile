FROM node:alpine as node
### ANGULAR ###
WORKDIR /usr/app

COPY package*.json ./

RUN npm install && npm i -g web-push

EXPOSE 4200 49153

COPY . .

CMD [ "npm", "start"]

EXPOSE 4200 49153 8080
