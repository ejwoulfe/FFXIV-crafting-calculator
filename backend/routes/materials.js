const express = require('express')
const router = express.Router()
const db = require('../config/connect-to-database');


// This request will gather a materials name, icon, and quantity using a recipes id as a foreign key to the materials_list table.
// From the materials_list table we can get the material_ids of all the required materials which will be gathering from the materials table.
router.get("/id/:recipeId", (req, res) => {

    db.query(`select M.name, M.icon, ML.quantity from materials_list as ML INNER JOIN materials as M ON ML.material_id = M.material_id AND ML.recipe_id = ${req.params.recipeId}`, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});

// This request is when a user wants to filter recipes by a keyword.
// This keyword can be contained in a material name which is involed in creating a recipe.

router.get("/name/:keyword", (req, res) => {

    db.query(`SELECT materials_list.recipe_id FROM materials INNER JOIN materials_list ON materials.material_id = materials_list.material_id AND materials.name LIKE "%${req.params.keyword}%"`, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});


module.exports = router;