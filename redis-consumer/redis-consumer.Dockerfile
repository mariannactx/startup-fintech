FROM node:18-alpine as teste-leansaude-redis-consumer

WORKDIR /home/node/app
 
COPY . .
 
# RUN yarn install --production
# RUN npm install -g @nestjs/cli
# RUN yarn build

RUN yarn

CMD ["yarn", "start:dev"]