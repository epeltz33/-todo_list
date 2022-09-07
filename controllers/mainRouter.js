const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const mongoose = require("mongoose");
const Todoinfo = require("../models/infoSchema"); // import the model

router.get("/", async (req, res) => {
  const allTodos = await Todoinfo.find({}).sort("-date");

  res.render("home", { allTodos }); // render the home page and pass the data to it as an object
});

router.post("/", async (req, res) => {
  const newTodo = new Todoinfo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.send("Not updated");
    }
  });
  res.redirect("/");
});

router.get("/:id/delete", async (req, res) => {
  const todoDelete = await Todoinfo.findByIdAndDelete(req.params.id);

  res.redirect("/");
});

router.get("/:id/finish", async (req, res) => {
  const todoDelete = await Todoinfo.findByIdAndUpdate(req.params.id, {
    progress: "Completed", // update the progress field to finished
  });

  res.redirect("/");
});

router.get("/:id/update", async (req, res) => {
  const updateTodo = await Todoinfo.findById(req.params.id);

  res.render("update", { updateTodo });
});

router.get("/:id/update/final", async (req, res) => {
  const updateTodo = await Todoinfo.findByIdAndUpdate(req.params.id, {
    description: req.query.description,
  });

  res.redirect("/");
});

module.exports = router;
