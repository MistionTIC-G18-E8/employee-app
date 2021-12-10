const db = require("../models/index.js");

const Payslip = db.payslip;

// Create and Save a new Payslip
exports.create = (req, res) => {
  // Validate request
  console.log('received create request');
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Payslip
  // TODO: Requires further validation, hooks, etc.
  const payslip = new Payslip(req.body);

  // Save Payslip in the database
  payslip
    .save(payslip)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Payslip."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  let condition = {};

  Payslip.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Payslip with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Payslip.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Payslip with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Payslip with id=" + id });
    });
};

// Update a Payslip by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Payslip.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Payslip with id=${id}. Maybe Payslip was not found!`
        });
      } else res.send({ message: "Payslip was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Payslip with id=" + id
      });
    });
};

// Delete a Payslip with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Payslip.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Payslip with id=${id}. Maybe Payslip was not found!`
        });
      } else {
        res.send({
          message: "Payslip was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Payslip with id=" + id
      });
    });
};

// Delete all Payslips from the database.
exports.deleteAll = (req, res) => {
  Payslip.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Payslips were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};
