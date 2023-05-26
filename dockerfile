FROM node:18.11

COPY . .
WORKDIR .

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start:prod"]