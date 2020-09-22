FROM node:12

# Create and copy source directory
WORKDIR /usr/src/app/
COPY ./src/ ./src/

# Create and copy test directory
COPY ./tests/ ./tests/

#Copy base files
WORKDIR /usr/src/app/
COPY *.js ./
COPY package*.json ./

# Install dependencies
RUN npm install

EXPOSE 3333

CMD [ "npm", "start" ]