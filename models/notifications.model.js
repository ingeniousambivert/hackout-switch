const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewNotificationSchema = new Schema(
  {
    Fname: {
      type: String,
      required: true
    },
    Lname: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);
//NewPartnerSchema.plugin(require("mongoose-beautiful-unique-validation"));

// Export the model
module.exports = mongoose.model("Notification", NewNotificationSchema);
