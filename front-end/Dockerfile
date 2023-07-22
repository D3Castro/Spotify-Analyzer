FROM node:18-slim

WORKDIR /user/src/app 

COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm" ]

CMD ["install", "--legacy-peer-deps;", "start"]