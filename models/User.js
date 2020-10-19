const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  mob: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  uploadData: {
    type: Object,
  },
  processedText: {
    type: String,
  },
  storeName: {
    type: String,
  },
  totalAmount: {
    type: String,
  },
});
module.exports = User = mongoose.model("users", UserSchema);
