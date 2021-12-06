module.exports = app => {

  const controller = require("../controllers/contract");
  var router = require("express").Router();

  // Create a new contract
  router.post("/", controller.create);

  // Retrieve all contracts
  router.get("/", controller.findAll);

  // Retrieve a single contract with id
  router.get("/:id", controller.findOne);

  // Update a contract with id
  router.put("/:id", controller.update);

  // Delete a contract with id
  router.delete("/:id", controller.delete);

  // Delete all contract
  router.delete("/", controller.deleteAll);

  app.use("/api/contract", router);
};
