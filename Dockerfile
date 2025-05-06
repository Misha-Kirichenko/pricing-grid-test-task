FROM node:lts-slim
WORKDIR /app
COPY . .
COPY package*.json ./
RUN npm ci
CMD ["npm", "run", "start"]