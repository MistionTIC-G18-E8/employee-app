const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");

function quit_handler(signal) {
  console.log(`\nGracefully shutting down from ${signal} (Ctrl-C)`);
  process.exit();
};

process.on("SIGTERM", quit_handler);
process.on("SIGINT", quit_handler);

const app = express();

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// CORS middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Logging middleware
app.use(morgan("common"));

// Middleware to parse requests of content-type - application/json
app.use(express.json());

// Middleware to parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Databsae setup
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database");
    if (env.INIT_DB === "true") {
      console.log("Initializing database...");
      require("./db/init")();
    }
  })
  .catch(err => {
    console.log("Cannot connect to the database", err);
    process.exit();
  });

// Register routers
require("./routes/employee")(app);
require("./routes/user")(app);
require("./routes/contract")(app);
require("./routes/payslip")(app);
require("./routes/employee_request")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})
