FROM node:22-alpine

WORKDIR /backend/app

COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.tsbuildinfo ./
RUN npm install

COPY . .
RUN npm run build

CMD ["node","dist/index.js"]

