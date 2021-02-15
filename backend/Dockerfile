FROM node:14.15.3

LABEL version="1.0"

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install
COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:dev"]
