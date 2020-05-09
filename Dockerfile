# pull official base image
FROM node:current-slim

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json .

RUN npm install --silent
# RUN npm install react-scripts -g
# RUN npm install serve -g  --save

# add app
COPY . .


# Uses port which is used by the actual application
EXPOSE 3000

# start app
CMD ["npm", "start"]