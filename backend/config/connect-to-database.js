const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();



dotenv.config();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.user,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect(err => {
    if (!err)
        console.log('Database is connected!');
    else
        console.log('Error connecting to the database: ' + JSON.stringify(err, undefined, 2));
});

module.exports = connection;



// Setup routes for our models.
const recipesRouter = require('../routes/recipes');
const discipleRouter = require('../routes/disciple');
const materialsRouter = require('../routes/materials');
const crystalsRouter = require('../routes/crystals');


// Routes to send requests through.
app.use('/recipes', recipesRouter);
app.use('/disciple', discipleRouter);
app.use('/materials', materialsRouter);
app.use('/crystals', crystalsRouter);


app.listen(process.env.PORT, () => {

    console.log("Server is running on port " + process.env.PORT);

});