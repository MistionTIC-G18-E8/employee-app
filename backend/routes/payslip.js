module.exports = app => {

  const controller = require("../controllers/payslip");
  var router = require("express").Router();

  // Create a new payslip
  router.post("/", controller.create);

  // Retrieve all payslips
  router.get("/", controller.findAll);

  // Retrieve a single payslip with id
  router.get("/:id", controller.findOne);

  // Update a payslip with id
  router.put("/:id", controller.update);

  // Delete a payslip with id
  router.delete("/:id", controller.delete);

  // Delete all payslip
  router.delete("/", controller.deleteAll);

  app.use("/api/payslip", router);
};
