const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewPartnerSchema = new Schema(
  {
    Fname: {
      type: String,
      required: true
    },
    Lname: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "partner"
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    phone: {
      type: Number,
      required: false
    },
    gender: {
      type: String,
      required: false
    },
    age: {
      type: String,
      required: false
    },

    address: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: false
    },
    postalcode: {
      type: String,
      required: false
    },

    qualification: {
      type: String,
      required: false
    },
    bio: {
      type: String,
      required: false
    },
    aadhar: {
      type: Number,
      required: true
    },
    languages: {
      type: Array,
      required: false
    }
  },
  {
    timestamps: true
  }
);
//NewPartnerSchema.plugin(require("mongoose-beautiful-unique-validation"));

// Export the model
module.exports = mongoose.model("Partner", NewPartnerSchema);
