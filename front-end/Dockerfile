FROM node:18 AS builder

WORKDIR /user/src/app

COPY package.json package-lock.json ./

RUN npm ci --quiet

COPY . .

RUN npm run build

# Stage 2: Create the final production image
FROM node:18-alpine

WORKDIR /user/src/app

COPY --from=builder /user/src/app/package.json /user/src/app/package-lock.json ./
COPY --from=builder /user/src/app/build ./build

RUN npm ci --quiet --production

CMD ["npm", "start"]