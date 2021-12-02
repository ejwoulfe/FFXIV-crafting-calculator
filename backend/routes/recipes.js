const express = require('express')
const router = express.Router()
const db = require('../config/connect-to-database');



// Get recipe by id
// router.get('/:recipeId', function (req, res) {
//     let sql = "SELECT * FROM ffxivcc.recipes where recipe_id =";
// })

router.get("/", (req, res) => {

    let sql = "SELECT * FROM recipes";



    db.query(sql, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })

});

router.get("/:discipeId", (req, res) => {



    db.query(`SELECT * FROM ffxivcc.recipes where disciple_id = ${req.params.discipeId}`, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});


module.exports = router