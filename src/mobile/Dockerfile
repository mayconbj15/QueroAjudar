FROM node:12

# Create and copy source directory
WORKDIR /usr/src/app/
COPY . .

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006

#Install dependencies
RUN npm install
RUN npm install -g expo-cli

CMD ["npm", "start"]
