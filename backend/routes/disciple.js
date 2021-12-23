const express = require('express')
const router = express.Router()
const db = require('../config/connect-to-database');


// Get the total number of recipes in a specified disciple.
router.get("/id&=:discipeId", (req, res) => {

    db.query(`SELECT COUNT(*)FROM recipes where disciple_id = ${req.params.discipeId}`, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});

// Get all recipes in a specific disciple of the hand, 100 at a time depending on the page number.
router.get("/id&=:discipeId/page&=:page", (req, res) => {

    let rowStart = (req.params.page - 1) * 100;

    db.query(`SELECT * FROM recipes where disciple_id = ${req.params.discipeId} LIMIT ${rowStart}, 100`, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});

// Get 100 recipes from a disciple on a certain page number and sorted depending on the order picked.
router.get("/id&=:discipeId/page&=:page/order&=:order", (req, res) => {

    let rowStart = (req.params.page - 1) * 100;

    console.log(req.params.order)

    db.query(`SELECT * FROM recipes where disciple_id = ${req.params.discipeId} LIMIT ${rowStart}, 100`, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});


module.exports = router;