const express = require('express')
const router = express.Router()
const db = require('../config/connect-to-database');



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