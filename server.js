const express = require( 'express' );
const app = express();
const chalk = require( 'chalk' );
const mainRouter = require( './controllers/mainRouter' );
const mongoose = require( 'mongoose' );
require( "dotenv" ).config();
const morgan = require( 'morgan' );
const PORT = process.env.PORT || 3000;


app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );
 

app.set( 'view engine', 'ejs' );

app.use( '/', mainRouter ); // use mainRouter for all routes starting with '/'

const url = process.env.MONGO_URL
mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true } )

	.then( () => app.listen( PORT, () => console.log( chalk.magentaBright( `Server running on port: ${ PORT }` ) ) ) )

	.catch( ( error ) => console.log( chalk.redBright( error.message ) ) )






