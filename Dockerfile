# Build Stage

FROM node:20-alpine AS BUILD_IMAGE

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build:production

# Production Stage

FROM node:20-alpine AS PRODUCTION_STAGE

WORKDIR /app

COPY --from=BUILD_IMAGE /app/.env.production ./.env.production

COPY --from=BUILD_IMAGE /app/next.config.js ./next.config.js

COPY --from=BUILD_IMAGE /app/package.json ./package.json

COPY --from=BUILD_IMAGE /app/yarn.lock ./yarn.lock

COPY --from=BUILD_IMAGE /app/.next ./.next

COPY --from=BUILD_IMAGE /app/public ./public

COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 5000

CMD ["npm", "run", "docker:start"]