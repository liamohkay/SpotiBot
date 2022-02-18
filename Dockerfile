FROM node:lts-alpine3.14
WORKDIR /apps/spotibot
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build:prod
EXPOSE 3000
CMD ["node", "./server/index.js"]