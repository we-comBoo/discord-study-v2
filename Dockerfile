## set base image
FROM node:20-alpine


## set working directory
WORKDIR /usr/src/app

## COPY necessory files
COPY package*.json ./ 

## Install necessory packages
RUN npm ci

COPY . .


CMD ["npm", "run","start"]