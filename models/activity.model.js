const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewActivitySchema = new Schema(
  {
    consumerName: {
      type: String,
      required: true
    },
    need: {
      type: String,
      required: true
    },
    examcenter: {
      type: String,
      required: true
    },
    field: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    postalcode: {
      type: String,
      default: "consumer"
    },
    language: {
      type: String,

      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);
//NewConsumerSchema.plugin(require("mongoose-beautiful-unique-validation"));

// Export the model
module.exports = mongoose.model("Request", NewRequestSchema);
