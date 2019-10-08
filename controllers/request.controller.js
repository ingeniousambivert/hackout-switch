const Request = require("../models/request.model.js");

// Create and Save a new Request
exports.create = (req, res) => {
  // Create a Partner
  const request = new Request({
    consumerName: req.body.Fname + req.body.Lname,
    need: req.body.need,
    examcenter: req.body.examcenter,
    field: req.body.field,
    subject: req.body.subject,
    postalcode: req.body.postalcode,
    language: req.body.language,
    date: req.body.date,
    time: req.body.time
  });

  // Save Partner in the database
  request
    .save()
    .then(data => {
      console.log("Saved request");
      res.redirect("/consumerLogin");
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Partner."
      });
    });
};

// Retrieve and return all Partners from the database.
exports.findAll = (req, res) => {
  Request.find()
    .then(Requests => {
      res.send(Requests);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Partners."
      });
    });
};

// Find a single Partner with a PartnerId
exports.findOne = (req, res) => {
  Request.findById(req.params.RequestId)
    .then(Request => {
      if (!Request) {
        return res.status(404).send({
          message: "Partner not found with id " + req.params.PartnerId
        });
      }
      res.send(Partner);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Partner not found Partner id " + req.params.PartnerId
        });
      }
      return res.status(500).send({
        message: "Error retrieving Partner with id " + req.params.PartnerId
      });
    });
};

// Update a Partnerer identified by the PartnerId in the request
exports.update = (req, res) => {
  //   // Validate Request
  //   if (!req.body.content) {
  //     return res.status(400).send({
  //       message: "Partner content can not be empty"
  //     });
  //   }

  // Find Partner and update it with the request body
  Request.findByIdAndUpdate(
    req.params.PartnerId,
    {
      Fname: "newone",
      Lname: "anotherone",
      email: "lastone",
      aadhar: 23234676,
      phone: 12466423
    },
    { new: true }
  )
    .then(Partner => {
      if (!Partner) {
        return res.status(404).send({
          message: "Partner not found with id " + req.params.PartnerId
        });
      }
      res.send(Partner);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Partner not found with id " + req.params.PartnerId
        });
      }
      return res.status(500).send({
        message: "Error updating Partner with id " + req.params.PartnerId
      });
    });
};

// Delete a Partner with the specified PartnerId in the request
exports.delete = (req, res) => {
  Partner.findByIdAndRemove(req.params.PartnerId)
    .then(Partner => {
      if (!Partner) {
        return res.status(404).send({
          message: "Partner not found with id " + req.params.PartnerId
        });
      }
      res.send({ message: "Partner deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Partner not found with id " + req.params.PartnerId
        });
      }
      return res.status(500).send({
        message: "Could not delete Partner with id " + req.params.PartnerId
      });
    });
};
