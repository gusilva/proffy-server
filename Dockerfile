FROM node:13.11-alpine As development

WORKDIR /usr/src/app

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:13.11-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY yarn.lock ./

RUN yarn install --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
