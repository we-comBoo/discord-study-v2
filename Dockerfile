## set base image
FROM node:20-alpine

# ⭐ 'ARG' 예약어를 통해 인자로 전달 받아야 한다.
ARG DISCORD_TOKEN 
ENV DISCORD_TOKEN=${DISCORD_TOKEN}

## set working directory
WORKDIR /usr/src/app

## COPY necessory files
COPY package*.json ./ 

## Install necessory packages
RUN npm ci

COPY . .


CMD ["npm", "run","start"]