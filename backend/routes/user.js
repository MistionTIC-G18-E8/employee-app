module.exports = app => {

  const controller = require("../controllers/user");
  const middlewares = require("../middlewares");
  let router = require("express").Router();

  // Login
  router.post("/login", controller.login);

  // Auth middleware set after /login
  router.use(middlewares.auth);

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

  // Register all routes
  app.use("/api/user", router);
}
