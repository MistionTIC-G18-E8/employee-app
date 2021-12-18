const db = require("../models/index.js");
const User = db.user;
const jwt = require("jsonwebtoken");
const SECRET_KEY = require('../config/config').SECRET_KEY;

// Middleware for login, does not call next()
exports.login = async (req, res, _) => {

  // Get user input
  const { email, password } = req.body;

  // Email and user should not be empty
  if (!(email && password)) {
    res.status(400).json({
      message: "Email and password are required"
    });
    return;
  }

  // Find the user in the database and perform validation
  User.findOne({ email: email }, (err, user) => {
    console.log(user);
    if (err) {
      res.status(404).send({
        success: false,
        message: "Invalid email or password"
      });
      return;
    }
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Invalid email or password"
      });
      return;
    }
    user.comparePassword(password, (err, ok) => {
      if (err) {
        res.status(404).send({
          success: false,
          message: "Invalid email or password"
        });
        return;
      }
      if (ok) {
        // New token for the user
        const token = jwt.sign({ id: user._id }, SECRET_KEY, {
          expiresIn: 86400 // 24 hours
        });
        res.json({
          success: true,
          token_type: "Bearer",
          token: token,
          expires_in: 86400,
          expires_on: Date.now() + 86400,
          user: user._id,
          employee: user.employee,
        });
      }
    });
  });
}

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  console.log('received create request');
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  // TODO: Requires further validation, hooks, etc.
  const user = new User(req.body);

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  let condition = {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};
