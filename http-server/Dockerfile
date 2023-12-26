FROM node:latest

WORKDIR /http

COPY . ./

RUN npm install
RUN npm run build

CMD ["npm", "run", "start:prod"]