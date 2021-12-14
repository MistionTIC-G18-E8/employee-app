module.exports = app => {

  const middlewares = require("../middlewares");
  const controller = require("../controllers/employee");
  var router = require("express").Router();
  router.use(middlewares.auth);

  // Create a new employee
  router.post("/", controller.create);

  // Retrieve all Employees
  router.get("/", controller.findAll);

  // Retrieve a single employee with id
  router.get("/:id", controller.findOne);

  // Update a employee with id
  router.put("/:id", controller.update);

  // Delete a employee with id
  router.delete("/:id", controller.delete);

  // Delete all employee
  router.delete("/", controller.deleteAll);

  app.use("/api/employee", router);
};
