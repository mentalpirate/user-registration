FROM node:14-alpine
# Set the working directory
WORKDIR /app
# Copy the packages.josn in to the container
COPY package.json /app
# install dependencies 
RUN npm install --silent
# Copy the rest of app code
COPY . /app
#Expose the port 
EXPOSE 5000
# Run the app 
CMD ["node","frontend.js"]