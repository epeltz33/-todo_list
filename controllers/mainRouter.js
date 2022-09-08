const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const mongoose = require("mongoose");
const Todoinfo = require("../models/infoSchema");

router.get("/", async (req, res) => {
  // get all todos
  const allTodos = await Todoinfo.find({}).sort("-date");

  res.render("home", { allTodos });
});

router.post("/", async (req, res) => {
  // add a todo
  const newTodo = new Todoinfo(req.body); // create a new todo
  await newTodo.save((err) => {
    // save the new todo
    if (err) {
      res.send("Not updated");
    }
  });
  //res.redirect("/");
});

router.get("/:id/delete", async (req, res) => {
  // delete a todo
  const todoDelete = await Todoinfo.findByIdAndDelete(req.params.id); // find the todo by id and delete it?

  res.redirect("/"); // redirect to home page
});

router.get("/:id/finish", async (req, res) => {
  // finish a todo (change status to completed)
  const todoDelete = await Todoinfo.findByIdAndUpdate(req.params.id, {
    progress: "Completed",
  });

  res.redirect("/");
});
// use router.put to update a todo
//   router.put("/:id/update", async (req, res) => {
   // update a todo
//   const todoUpdate = await Todoinfo.findByIdAndUpdate(req.params.id, {
//     progress: " In Progress",
//   });
//    res.redirect("/"); // redirect to home page
// });
router.get("/:id/update", async (req, res) => {
  // update a todo (change status to in progress)
  const updateTodo = await Todoinfo.findById(req.params.id); // find the todo by id and update it?

  res.render("update", { updateTodo }); // render the update page with the todo
});

router.get("/:id/update/final", async (req, res) => {
  // update a todo (change status to finished)
  const updateTodo = await Todoinfo.findByIdAndUpdate(req.params.id, {
    // find the todo by id and update it?
    description: req.body.description, // update the description of the todo with the new description
  });

  res.redirect("/");
});

module.exports = router;
