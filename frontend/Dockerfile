FROM node:14 AS builder

WORKDIR /ust/src/app
COPY package.json .
COPY yarn.lock .

RUN npm install yarn
RUN yarn install
COPY . /ust/src/app

CMD yarn start
