const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ContentSchema = new Schema({
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
module.exports = User = mongoose.model("content", ContentSchema);
