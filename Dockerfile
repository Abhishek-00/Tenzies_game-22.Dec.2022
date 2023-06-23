# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the React app


# Specify the command to run when the container starts
CMD ["npm", "start"]