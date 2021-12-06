// The information for connecting to the database is retrieved from the environment variables
env = process.env;
module.exports = {
  url: `mongodb://${env.DB_USER}:${env.DB_PASSWORD}@mongodb:27017/`
};
