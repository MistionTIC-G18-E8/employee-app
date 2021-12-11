FROM docker.io/node:16 as base
# The application will be in a volume mounted at this path in development it
# will include node modules.
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Expose port
EXPOSE 3000
CMD [ "npm", "run", "start" ]

# In producion the source is not mounted, rather copied and the node_modules
# are fetched.
FROM base as production
COPY . .
RUN rm -rf node_modules
RUN npm install
CMD [ "npm", "run", "build" ]
