module.exports = app => {

  const employee = require("../controllers/employee");
  var router = require("express").Router();

  // Create a new employee
  router.post("/", employee.create);

  // Retrieve all Employees
  router.get("/", employee.findAll);

  // Retrieve a single employee with id
  router.get("/:id", employee.findOne);

  // Update a employee with id
  router.put("/:id", employee.update);

  // Delete a employee with id
  router.delete("/:id", employee.delete);

  // Create a new employee
  router.delete("/", employee.deleteAll);

  app.use("/api/employee", router);
};
