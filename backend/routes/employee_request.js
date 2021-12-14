const middlewares = require("../middlewares");
module.exports = app => {

  const controller = require("../controllers/employee_request");
  var router = require("express").Router();
  router.use(middlewares.auth);

  // Create a new employee_request
  router.post("/", controller.create);

  // Retrieve all employee_requests
  router.get("/", controller.findAll);

  // Retrieve a single employee_request with id
  router.get("/:id", controller.findOne);

  // Update a employee_request with id
  router.put("/:id", controller.update);

  // Delete a employee_request with id
  router.delete("/:id", controller.delete);

  // Delete all employee_request
  router.delete("/", controller.deleteAll);

  app.use("/api/employee_request", router);
};
