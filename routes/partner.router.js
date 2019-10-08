const express = require("express");
const partnerRouter = express.Router();

const partner = require("../controllers/partner.controller.js");
// Create a new Partner
partnerRouter.post("/partner", partner.create);

// Retrieve all partner
partnerRouter.get("/showPartners", partner.findAll);
partnerRouter.get("/partnerRegisteration", (req, res) => {
  res.render("pages/partnerRegisteration");
});
// Retrieve a single Partner with PartnerId
partnerRouter.get("/partner/:PartnerId", partner.findOne);

// Update a Partner with PartnerId
partnerRouter.put("/partner/:PartnerId", partner.update);

// Delete a Partner with PartnerId
partnerRouter.delete("/partner/:PartnerId", partner.delete);

module.exports = partnerRouter;
