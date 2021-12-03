const express = require("express");
const cors = require("cors");
const db = require("./models");

function quit_handler (signal) {
  console.log(`\nGracefully shutting down from ${signal} (Ctrl-C)`);
  process.exit();
};

process.on("SIGTERM", quit_handler);
process.on("SIGINT", quit_handler);

const app = express();

// set port, listen for requests
const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: `http://localhost:${PORT}`,
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

// Register the routes for 'employee' model /api/employee
require("./routes/employee")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
