FROM node:12

# Create and copy source directory
WORKDIR /app/

#Copy base files
COPY . .

# Install dependencies
RUN npm install
RUN npm install react-scripts -g --silent

EXPOSE 3000

CMD [ "npm", "start" ]