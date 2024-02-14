FROM node:18

# Expose port 3000
EXPOSE 3000

# Create an app directory and copy packages files to it
WORKDIR /usr/src/app
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy source code to app directory
COPY . .

# Give acces to and set the user to node
RUN chown -R node:node /usr/src/app
USER node

# Build the app (dist folder)
RUN yarn build

# Start the server
CMD ["yarn", "start:prod"]
