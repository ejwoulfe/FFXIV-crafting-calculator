const express = require('express')
const router = express.Router()
const db = require('../config/connect-to-database');

// This request will gather a crystals name, icon, and quantity using a recipes id as a foreign key to the crystals_list table.
// From the crystals_list table we can get the crystals_ids of all the required crystals which will be gathering from the crystals table.
router.get("/id/:recipeId", (req, res) => {

    db.query(`select C.name, C.icon, CL.quantity from crystals_list as CL INNER JOIN crystals as C ON CL.crystal_id = C.crystal_id AND CL.recipe_id = ${req.params.recipeId}`, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});

module.exports = router;