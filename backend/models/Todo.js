const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const TodoSchema = new Schema({
  title: {
    type: String
  },
  user: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "uncompleted",
    enum: ["completed", "uncompleted"]
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: String
  }
});

mongoose.model('todos', TodoSchema);