module.exports = app => {

  const controller = require("../controllers/user");
  var router = require("express").Router();

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
