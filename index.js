const express = require('express');
const app = express();
const mongoose = require('mongoose');
const DB = process.env.DATABASE || 'mongodb://localhost:27017/your_database_name';
const PORT = process.env.PORT || 5000;
const morgan = require('morgan'); // log requests to the console (express4)
const chalk = require('chalk');
const dotenv = require('dotenv');
const mainRouter = require('./routes/mainRouter');
dotenv.config();
app.use(urlencoded({ extended: true }));
app.use(json());


app.set('view engine', 'ejs');
app.use('/', mainRouter); // use mainRouter for all routes starting with /

// connection to database
mongoose.connect(process.env.Database_URL ).then(() => {
	console.log( chalk.blue ( 'Connected to database' ) );
}).catch((err) => {
	console.log( chalk.red ( `Error connecting to database: ${err}` ) );
});

// start the server
app.listen(PORT, () => {
	console.log( chalk.green ( `Server started on port ${PORT}` ) );
} );



