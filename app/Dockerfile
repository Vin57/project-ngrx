FROM node:alpine as node
### ANGULAR ###
WORKDIR /usr/app

COPY package*.json ./

RUN npm install

EXPOSE 4200 49153

COPY . .

CMD [ "npm", "start"]
