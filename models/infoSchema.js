// post to the database using the model

const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils"); // import the stringify function from the utils module of nodemon for formatting the date

const infoSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
    enum: ["in progress", "finished"], // enum is used to specify the possible values for the field
    default: "in progress",
  },

  date: {
    type: String,
    enum: ["in progress", "finished"], 
    default: "in progress",
  },
});

const infoModel = new mongoose.model("Todoinfo", infoSchema);

module.exports = infoModel;
