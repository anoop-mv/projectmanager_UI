## STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /dist/projectmanager_UI/usr/src/app
COPY package.json ./
RUN npm install
COPY . .
