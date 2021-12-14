module.exports = app => {

  const controller = require("../controllers/user");
  var router = require("express").Router();
  const db = require("../models/index.js");
  const User = db.user;
  const jwt = require("jsonwebtoken");
  const SECRET_KEY = require('../config/config').SECRET_KEY;
  let router = require("express").Router();

  // Middleware for login, does not call next()
  router.post("/login", async (req, res, _) => {

    // Get user input
    const { email, password } = req.body;

    // Email and user should not be empty
    if (!(email && password)) {
      res.status(400).json({
        message: "Email and password are required"
      });
      return;
    }

    // Find the user in the database and perform validation
    User.findOne({ email: email }, (err, user) => {
      console.log(user);
      if (err) {
        res.status(404).send({
          success: false,
          message: "Invalid email or password"
        });
        return;
      }
      if (!user) {
        res.status(404).send({
          success: false,
          message: "Invalid email or password"
        });
        return;
      }
      user.comparePassword(password, (err, ok) => {
        if (err) {
          res.status(404).send({
            success: false,
            message: "Invalid email or password"
          });
          return;
        }
        if (ok) {
          // New token for the user
          const token = jwt.sign({ id: user._id }, SECRET_KEY, {
            expiresIn: 86400 // 24 hours
          });
          res.json({
            success: true,
            token_type: "Bearer",
            token: token,
            expires_in: 86400,
            expires_on: Date.now() + 86400,
          });
        }
      });
    });
  });

  // Create a new user
  router.post("/", controller.create);

  // Retrieve all users
  router.get("/", controller.findAll);

  // Retrieve a single user with id
  router.get("/:id", controller.findOne);

  // Update a user with id
  router.put("/:id", controller.update);

  // Delete a user with id
  router.delete("/:id", controller.delete);

  // Delete all user
  router.delete("/", controller.deleteAll);

  app.use("/api/user", router);
};
