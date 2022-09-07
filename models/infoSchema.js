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
    enum: ["In progress", "Completed"], // enum is used to specify the possible values for the field
    default: "In progress",
  },

	date: {
		type: String,
		default: Date.now
	}
});

const infoModel = new mongoose.model("Todoinfo", infoSchema);

module.exports = infoModel ;
