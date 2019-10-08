const express = require("express");
const consumerRouter = express.Router();
const fileUpload = require("express-fileupload");
const say = require("say");
const consumer = require("../controllers/consumer.controller.js");

// default options
consumerRouter.use(fileUpload());

consumerRouter.post("/upload", function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  let filename = "FILE" + Date.now().toString();
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`./public/img/${filename}.png`, function(err) {
    if (err) return res.status(500).send(err);
    else {
      res.redirect(`/upload/${filename}`);
    }
  });
});

consumerRouter.get("/upload/:filename", function(req, res) {
  // OCR API
  const ocrSpaceApi = require("ocr-space-api");

  const options = {
    apikey: " 8d56bdab8188957",
    language: "eng", // language
    imageFormat: "image/jpg", // Image Type
    isOverlayRequired: true
  };

  // Image file to upload
  const imageFilePath = `./public/img/${req.params.filename}.png`;

  // Run and wait the result
  ocrSpaceApi
    .parseImageFromLocalFile(imageFilePath, options)
    .then(function(parsedResult) {
      const Text = parsedResult.parsedText;
      console.log("parsedText: \n", parsedResult.parsedText);
      res.render("pages/speak", { text: Text });
      say.speak(Text);
      // console.log("ocrParsedResult: \n", parsedResult.ocrParsedResult);
    })
    .catch(function(err) {
      console.log("ERROR:", err);
    });
});

//consumerRouter.post("/consumer", consumer.create);
consumerRouter.post("/consumer", consumer.create);
// Retrieve all consumer
consumerRouter.get("/showConsumers", consumer.findAll);

consumerRouter.get("/consumerRegisteration", (req, res) => {
  res.render("pages/consumerRegisteration", {
    emailError: false,
    passError: false
  });
});

// Retrieve a single Note with noteId
consumerRouter.get("/consumer/:ConsumerId", consumer.findOne);

// Update a Note with noteId
consumerRouter.put("/consumerDashboard/:ConsumerId", consumer.update);

// Delete a Note with noteId
consumerRouter.delete("/consumer/:ConsumerId", consumer.delete);

module.exports = consumerRouter;
