FROM node:17-alpine AS builder
WORKDIR /usr/src/app
COPY ./package*.json ./
COPY ./tsconfig.json ./
RUN npm ci --silent
COPY ./src ./src
RUN npm run tsc
RUN npm prune --production

FROM node:17-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
#COPY .env ./
CMD ["node", "./dist/index.js"]




