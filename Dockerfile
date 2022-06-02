FROM node:16.13.1-alpine

ENV TZ=America/Mexico_City

RUN mkdir -p /app

RUN npm install -g @nestjs/cli@8.1.2

WORKDIR /app
COPY . /app

RUN npm i

RUN nest build

CMD [ "node", "dist/main", "--max-old-space-size=4096"]