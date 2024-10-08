FROM node:18-alpine AS teste-leansaude-api

WORKDIR /home/node/app
 
COPY . .
 
# RUN yarn install --production
# RUN npm install -g @nestjs/cli
# RUN yarn build
 
RUN yarn

EXPOSE 3000

CMD ["yarn", "start:dev"]