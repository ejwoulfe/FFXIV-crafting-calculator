const express = require('express')
const router = express.Router()
const db = require('../config/connect-to-database');


// Get from all recipes
router.get("/", (req, res) => {

    db.query("SELECT * FROM recipes LIKE ", (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })

});

// Get all recipes in a specific disciple of the hand.
router.get("disciple/:discipeId", (req, res) => {

    db.query(`SELECT * FROM recipes where disciple_id = ${req.params.discipeId}`, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});


// 
router.get("/:recipeName", (req, res) => {

    db.query(`SELECT * FROM recipes WHERE name LIKE "%${req.params.recipeName}%"`, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});


module.exports = router