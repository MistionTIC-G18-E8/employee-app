const db = require("../models/index.js");
const Contract = db.contract;

// Create and Save a new Contract
exports.create = (req, res) => {
  // Validate request
  console.log('received create request');
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Contract
  // TODO: Requires further validation, hooks, etc.
  const contract = new Contract(req.body);

  // Save Contract in the database
  contract
    .save(contract)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contract."
      });
    });
};

// Retrieve all contracts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Contract.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ontracts."
      });
    });
};

// Find a single Contract with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Contract.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Contract with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Contract with id=" + id });
    });
};

// Update a Contract by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Contract.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contract with id=${id}. Maybe Contract was not found!`
        });
      } else res.send({ message: "Contract was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Contract with id=" + id
      });
    });
};

// Delete a Contract with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Contract.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contract with id=${id}. Maybe Contract was not found!`
        });
      } else {
        res.send({
          message: "Contract was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contract with id=" + id
      });
    });
};

// Delete all Contracts from the database.
exports.deleteAll = (req, res) => {
  Contract.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Contracts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all contracts."
      });
    });
};
