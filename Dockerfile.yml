# Build Stage

FROM node:20-alpine AS BUILD_IMAGE

WORKDIR /app

COPY package*.json ./

RUN npm i -g yarn

RUN yarn

COPY . .

RUN yarn build:production

# Production Stage

FROM node:20-alpine AS PRODUCTION_STAGE

WORKDIR /app

COPY --from=BUILD_IMAGE /app/.env ./.env

COPY --from=BUILD_IMAGE /app/next.config.js ./next.config.js

COPY --from=BUILD_IMAGE /app/package*.json ./

COPY --from=BUILD_IMAGE /app/.next ./.next

COPY --from=BUILD_IMAGE /app/public ./public

COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 5000

CMD ["npm", "run", "docker:start"]