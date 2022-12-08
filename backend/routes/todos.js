const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authenticateToken = require("../helpers/auth");


// load schema
require("../models/Todo");
const Todo = mongoose.model("todos");

// Todo Index Page
router.get("/", authenticateToken, (req, res) => {
  Todo.find({ user: req.user?.user._id })
    .sort({ creationDate: "descending" })
    .then((todos) => {
      res.json({
        todos: todos,
      });
    }); 
});

// edit todo form
router.get("/:id", authenticateToken, (req, res) => {
  Todo.findOne({
    _id: req.params.id,
  }).then((todo) => {
    res.json({
      todo: todo,
    });
  });
});

router.post("/", authenticateToken, (req, res) => {
  if (!req.body.title) {
    return res.json({
      text: "Please add title",
    });
  }

  const newUser = {
    title: req.body.title,
    user: req.user.user._id,
    status: req.body.status,
    dueDate: req.body.duedate,
  };
  const saveData = new Todo(newUser);
  saveData
    .save()
    .then((data) => {
      res.json({ message: "todo created successfully", data: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

// edit form process
router.put("/:id", authenticateToken, (req, res) => {
  Todo.findOne({
    _id: req.params.id,
  }).then((todo) => {
    // new values
    todo.title = req.body.title;
    todo.dueDate = req.body.duedate;
    todo.status = req.body.status;
    todo.save().then((todo) => {
      res.json(todo);
    });
  });
});

// delete Todo
router.delete("/:id", authenticateToken, (req, res) => {
  if (req.user.user.role == "admin") {
    Todo.remove({
      _id: req.params.id,
    }).then((data) => {
      res.json({ message: "todos delete succesfully", delete_data: data });
    });
  } else {
    res.json({ message: "Only admin can delete the todo" });
  }

});

module.exports = router;
