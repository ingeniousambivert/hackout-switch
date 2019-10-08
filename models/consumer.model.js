const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewConsumerSchema = new Schema(
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
      default: "consumer"
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    phone: {
      type: Number,
      unique: true,
      required: true
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
      unique: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);
//NewConsumerSchema.plugin(require("mongoose-beautiful-unique-validation"));

// Export the model
module.exports = mongoose.model("Consumer", NewConsumerSchema);
