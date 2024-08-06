FROM node:18-alpine
WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5500
CMD ["node", "index.js"]