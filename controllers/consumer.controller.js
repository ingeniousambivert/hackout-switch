const Consumer = require("../models/consumer.model.js");

// Create and Save a new Consumer
exports.create = (req, res) => {
  // Validate Request
  if (req.body.password !== req.body.confirmpassword) {
    res.render("pages/consumerRegisteration", {
      emailError: false,
      passError: true
    });
  }
  //a simple if/else to check if email already exists in db
  Consumer.findOne({ email: req.body.email }, function(err, consumer) {
    if (err) {
      err.status = 400;
    } else if (consumer) {
      res.render("pages/consumerRegisteration", { emailError: true });
    } else {
      // Create a Consumer
      const consumer = new Consumer({
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        email: req.body.email,
        password: req.body.password,
        aadhar: req.body.phone,
        phone: req.body.phone
      });

      // Save consumer in the database
      consumer
        .save()
        .then(data => {
          res.redirect("/consumerLogin");
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Consumer."
          });
        });
    }
  });
};

// Retrieve and return all Consumers from the database.
exports.findAll = (req, res) => {
  Consumer.find()
    .then(Consumers => {
      res.send(Consumers);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Consumers."
      });
    });
};
// Find a single Consumer with a ConsumerId
exports.findOne = (req, res) => {
  Consumer.findById(req.params.ConsumerId)
    .then(Consumer => {
      if (!Consumer) {
        return res.status(404).send({
          message: "Consumer not found with id " + req.params.ConsumerId
        });
      }
      res.send(Consumer);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Consumer not found Consumer id " + req.params.ConsumerId
        });
      }
      return res.status(500).send({
        message: "Error retrieving Consumer with id " + req.params.ConsumerId
      });
    });
};

// Update a Consumerer identified by the ConsumerId in the request
exports.update = (req, res) => {
  // Find Consumer and update it with the request body
  Consumer.findByIdAndUpdate(
    req.params.ConsumerId,
    {
      Fname: req.body.Fname,
      Lname: req.body.Lname,
      address: req.body.address,
      city: req.body.city,
      postalcode: req.body.postalcode,
      //aadhar: req.body.phone,
      phone: req.body.phone,
      bio: req.body.bio,
      qualification: req.body.qualification
    },
    { new: true }
  )
    .then(Consumer => {
      if (!Consumer) {
        return res.status(404).send({
          message: "Consumer not found with id " + req.params.ConsumerId
        });
      }
      res.redirect("/consumerLogin");
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Consumer not found with id " + req.params.ConsumerId
        });
      }
      return res.status(500).send({
        message: "Error updating Consumer with id " + req.params.ConsumerId
      });
    });
};

// Delete a Consumer with the specified ConsumerId in the request
exports.delete = (req, res) => {
  Consumer.findByIdAndRemove(req.params.ConsumerId)
    .then(Consumer => {
      if (!Consumer) {
        return res.status(404).send({
          message: "Consumer not found with id " + req.params.ConsumerId
        });
      }
      res.send({ message: "Consumer deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Consumer not found with id " + req.params.ConsumerId
        });
      }
      return res.status(500).send({
        message: "Could not delete Consumer with id " + req.params.ConsumerId
      });
    });
};
