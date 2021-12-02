const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();



// Setup on port 5000
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
    if (err) {
        throw err
    }
    console.log("MySQL Connected")
});

module.exports = connection;



// Setup routes for our models.
const recipesRouter = require('../routes/recipes');
//const recipesByDiscRouter = require('../routes/recipes-by-disciple');

// Routes to send requests through.
app.use('/recipes', recipesRouter);
//app.use('/disciple/recipes', recipesByDiscRouter);

app.listen(process.env.PORT, () => {

    console.log("Server is running on port " + process.env.PORT);
});