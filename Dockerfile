FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prisma:generate

RUN npm run build

CMD ["/bin/sh", "-c", "yarn prisma:prod:migration && yarn prisma:seed && yarn start:prod"]

EXPOSE 3000