const db = require("../models/index.js");
const EmployeeRequest = db.employeeRequest;

// Create and Save a new EmployeeRequest
exports.create = (req, res) => {
  // Validate request
  console.log('received create request');
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a EmployeeRequest
  // TODO: Requires further validation, hooks, etc.
  const employeeRequest = new EmployeeRequest(req.body);

  // Save EmployeeRequest in the database
  employeeRequest
    .save(employeeRequest)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the EmployeeRequest."
      });
    });
};

// Retrieve all EmployeeRequests from the database.
exports.findAll = (req, res) => {
  let condition = {};

  EmployeeRequest.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving EmployeeRequests."
      });
    });
};

// Find a single EmployeeRequest with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  EmployeeRequest.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found EmployeeRequest with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving EmployeeRequest with id=" + id });
    });
};

// Update a EmployeeRequest by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  EmployeeRequest.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update EmployeeRequest with id=${id}. Maybe EmployeeRequest was not found!`
        });
      } else res.send({ message: "EmployeeRequest was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating EmployeeRequest with id=" + id
      });
    });
};

// Delete a EmployeeRequest with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  EmployeeRequest.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete EmployeeRequest with id=${id}. Maybe EmployeeRequest was not found!`
        });
      } else {
        res.send({
          message: "EmployeeRequest was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete EmployeeRequest with id=" + id
      });
    });
};

// Delete all EmployeeRequests from the database.
exports.deleteAll = (req, res) => {
  EmployeeRequest.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} EmployeeRequests were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all EmployeeRequests."
      });
    });
};
