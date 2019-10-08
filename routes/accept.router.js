const express = require("express");
const acceptRouter = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const accept = require("../controllers/accept.controller.js");

// Create a new Note
//consumerRouter.post("/consumer", consumer.create);
acceptRouter.post("/accept", accept.create, accept.delete, checkAuth);
// Retrieve all consumer
//acceptRouter.get("/showRequest", accept.findAll);

// // Retrieve a single Note with noteId
// requestRouter.get("/request/:ConsumerId", consumer.findOne);

// // Update a Note with noteId
// requestRouter.put("/consumerDashboard/:ConsumerId", consumer.update);

// // Delete a Note with noteId
//acceptRouter.delete("/accept", accept.delete);

module.exports = acceptRouter;
