# Use Node.js 18 as base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files first (for caching!)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Expose port 4000
EXPOSE 4000

# Start the app
CMD ["node", "index.js"]