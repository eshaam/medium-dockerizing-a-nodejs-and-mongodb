FROM node:alpine3.11

WORKDIR /usr/src/app

RUN apk update && apk add python g++ make && rm -rf /var/cache/apk/*

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

EXPOSE 3100
CMD [ "npm", "run", "start" ]
