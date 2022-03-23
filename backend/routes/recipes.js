const express = require('express')
const router = express.Router()
const db = require('../config/connect-to-database');



// 
router.get("/name/:recipeName", (req, res) => {
    console.log("testing")

    db.query(`SELECT * FROM recipes WHERE name LIKE "%${req.params.recipeName}%"`, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});


router.get("/id/:recipeId", (req, res) => {

    db.query(`SELECT * FROM materials_list WHERE recipe_id = ${req.params.recipeId}`, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});

router.get("/:id/name/:recipeName", (req, res) => {

    db.query(`SELECT * FROM recipes WHERE disciple_id = ${req.params.id} AND name LIKE "%${req.params.recipeName}%"`, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});


module.exports = router