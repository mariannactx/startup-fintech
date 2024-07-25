FROM node:18-alpine
 
WORKDIR /user/src/app
 
COPY . .
 
RUN yarn install --production
RUN npm install -g @nestjs/cli
RUN yarn build
 
EXPOSE 3000

CMD ["yarn", "start:dev"]