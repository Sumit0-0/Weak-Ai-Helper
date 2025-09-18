FROM node:22-alpine

WORKDIR /frontend/app

COPY package*.json ./
COPY eslint.config.js ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
RUN npm install

COPY . .

EXPOSE  5173

CMD ["npm","run","dev"]