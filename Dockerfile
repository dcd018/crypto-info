FROM node:8

# create app directory
WORKDIR /usr/src/app

# bundle app source
COPY . .

# install dependencies
RUN npm install

# build React app and start server 
RUN npm run build

ENTRYPOINT ["npm", "start"]

# start the server
#CMD [ "npm", "start" ]
