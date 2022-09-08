const express = require("express");
const router = express.Router();
const Todoinfo = require("../models/infoSchema"); // import the model
 // GET all todos
 router.get("/:id", async (req, res) => {
     const todo = await Todoinfo.findOne({ _id: req.params.id });
     !todo ? res.status(404).send("The todo with the given ID was not found.") : res.send(todo);
 });
 //  GET a single todo
router.get("/", async (req, res) => {
  const allTodos = await Todoinfo.find({}).sort("-date");

  res.render("home", { allTodos }); // render the home page and pass the data to it as an object
});
// POST a new todo
router.post("/", async (req, res) => {
  const newTodo = new Todoinfo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.send("Not updated");
    }
  });
  res.redirect("/");
});
// DELETE a todo
router.get("/:id/delete", async (req, res) => {
  const todoDelete = await Todoinfo.findByIdAndDelete(req.params.id);

  res.redirect("/");
});
// UPDATE a todo to completed
router.get("/:id/finish", async (req, res) => {
  const todoDelete = await Todoinfo.findByIdAndUpdate(req.params.id, {
    progress: "Completed", // update the progress field to finished
  });

  res.redirect("/");
});
// UPDATE a todo to in progress
router.get("/:id/update", async (req, res) => {
  const updateTodo = await Todoinfo.findById(req.params.id);

  res.render("update", { updateTodo });
});
// UPDATE a todo to completed
router.get("/:id/update/final", async (req, res) => {
  const updateTodo = await Todoinfo.findByIdAndUpdate(req.params.id, {
    description: req.query.description,
  });
   res.render("update", { updateTodo });


  res.redirect("/");
});


module.exports = router;