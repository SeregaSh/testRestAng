FROM node:20.14.0 AS development

WORKDIR /test/front/src/app

COPY package*.json ./

RUN npm install 
RUN npm install -g @angular/cli

COPY . .

RUN npm run start:dev

EXPOSE 4200