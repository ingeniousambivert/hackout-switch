const express = require("express");
const requestRouter = express.Router();

const request = require("../controllers/request.controller.js");

// Create a new Note
//consumerRouter.post("/consumer", consumer.create);
requestRouter.post("/request", request.create);
// Retrieve all consumer
requestRouter.get("/showRequest", request.findAll);

// // Retrieve a single Note with noteId
// requestRouter.get("/request/:ConsumerId", consumer.findOne);

// // Update a Note with noteId
// requestRouter.put("/consumerDashboard/:ConsumerId", consumer.update);

// // Delete a Note with noteId
// requestRouter.delete("/consumer/:ConsumerId", consumer.delete);

module.exports = requestRouter;
