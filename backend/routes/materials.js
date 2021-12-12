const express = require('express')
const router = express.Router()
const db = require('../config/connect-to-database');


router.get("/id/:recipeId", (req, res) => {

    db.query(`select ML.material_id as ID, M.name, M.icon, ML.quantity from materials_list as ML
    INNER JOIN materials as M ON ML.material_id = M.material_id
    AND ML.recipe_id = ${req.params.recipeId}`, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});

module.exports = router;