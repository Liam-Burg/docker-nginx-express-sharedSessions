FROM node:alpine 
WORKDIR /us/src/app 
COPY package*.json .
RUN npm ci
COPY . .
CMD ["node","index.js"]