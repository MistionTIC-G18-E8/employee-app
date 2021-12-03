const dbConfig = require("../config/db.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.employee = require("./employee.js")(mongoose);
db.url = dbConfig.url;
console.log('The configured db url is ' + db.url);
module.exports = db;
