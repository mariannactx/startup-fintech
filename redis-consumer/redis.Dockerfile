FROM node:18
 
WORKDIR /home/src/app
 
COPY . .
 
RUN yarn install --production
RUN npm install -g @nestjs/cli
RUN yarn build
 
EXPOSE 3000

CMD ["yarn", "start:prod"]