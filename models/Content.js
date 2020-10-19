const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ContentSchema = new Schema({
  storeName: {
    type: String,
    required: true
  },
  processedText: {
    type: String,
    required: true
  },
  totalAmount: {
    type: String,
    required: true
  },
});
module.exports = Content = mongoose.model("userContent", ContentSchema);