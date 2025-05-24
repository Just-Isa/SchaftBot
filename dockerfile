# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm install

# Copy entire project files
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Expose any ports if needed (Discord bots usually don't need this)
# EXPOSE 3000

# Run the compiled bot
CMD ["node", "build/index.js"]
