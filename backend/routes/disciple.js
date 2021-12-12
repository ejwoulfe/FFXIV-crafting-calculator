const express = require('express')
const router = express.Router()
const db = require('../config/connect-to-database');


// Get all recipes in a specific disciple of the hand.
router.get("/id/:discipeId", (req, res) => {

    db.query(`SELECT * FROM recipes where disciple_id = ${req.params.discipeId}`, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});

module.exports = router;