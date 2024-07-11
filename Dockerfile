FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install --only=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
