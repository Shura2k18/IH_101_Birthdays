const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ChatSchema = new Schema({
  chatId: {
    type: Number
  },
  username: {
    type: String
  },
  title: {
    type: String
  }
});

module.exports = Chat = mongoose.model("chats", ChatSchema);