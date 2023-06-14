# Use the official Node.js 18 base image
FROM node:18

# Set the working directory in the docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to docker image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port
EXPOSE 8080

# Run the application
CMD ["node", "index.mjs"]   