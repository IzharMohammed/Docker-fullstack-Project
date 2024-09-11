# Use Node.js version 20 as the base image
FROM node:20

# Set the working directory to /app inside the container
WORKDIR /app                          

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./                 

# Install the dependencies listed in package.json
RUN npm install                       

# Copy the Prisma schema directory into the container
COPY prisma ./prisma                  

# Generate the Prisma client from the schema
RUN npx prisma generate               

# Copy all remaining files into the working directory
COPY . .                              

# Expose port 4000 to allow external access
EXPOSE 4000                           

# Run the application using Node.js and start the server from index.js
CMD ["node", "index.js"]              
