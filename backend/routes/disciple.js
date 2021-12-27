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

// Get the total number of recipes in a specified disciple.
router.get("/id&=:discipeId/recipes", (req, res) => {

    db.query(`SELECT * FROM recipes where disciple_id = ${req.params.discipeId}`, (err, results) => {

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

    // 1: Recipe Level Ascending
    // 2: Recipe Level Descending
    // 3: Recipe Names A-Z
    // 4: Recipe Names Z-A


    let rowStart = (req.params.page - 1) * 100;
    let sqlQuery = ""

    switch (req.params.order) {
        case "1":
            sqlQuery = `SELECT * FROM recipes where disciple_id = ${req.params.discipeId} ORDER BY level ASC LIMIT ${rowStart}, 100`
            break;
        case "2":
            sqlQuery = `SELECT * FROM recipes where disciple_id = ${req.params.discipeId} ORDER BY level DESC LIMIT ${rowStart}, 100`
            break;
        case "3":
            sqlQuery = `SELECT * FROM recipes where disciple_id = ${req.params.discipeId} ORDER BY name ASC LIMIT ${rowStart}, 100`
            break;
        case "4":
            sqlQuery = `SELECT * FROM recipes where disciple_id = ${req.params.discipeId} ORDER BY name DESC LIMIT ${rowStart}, 100`
            break;
        default:
            throw new Error((message) => {
                console.log(message)
            });
    }

    db.query(sqlQuery, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});

// SELECT materials_list.recipe_id
// FROM materials
// INNER JOIN materials_list ON materials.material_id = materials_list.material_id
// AND materials.name LIKE "%Maple%"
// INNER JOIN recipes ON materials_list.recipe_id = recipes.recipe_id
// AND recipes.disciple_id = 2
// UNION select recipes.recipe_id from recipes where recipes.name LIKE "%Maple%" AND recipes.disciple_id = 2;
router.get("/id&=:discipeId/page&=:page/order&=:order/keyword&=:keyword", (req, res) => {

    // 1: Recipe Level Ascending
    // 2: Recipe Level Descending
    // 3: Recipe Names A-Z
    // 4: Recipe Names Z-A



    let rowStart = (req.params.page - 1) * 100;
    let sqlQuery = `SELECT materials_list.recipe_id FROM materials INNER JOIN materials_list ON materials.material_id = materials_list.material_id AND materials.name LIKE "%${req.params.keyword}%" INNER JOIN recipes ON materials_list.recipe_id = recipes.recipe_id AND recipes.disciple_id = ${req.params.discipeId} UNION select recipes.recipe_id from recipes where recipes.name LIKE "%${req.params.keyword}%" AND recipes.disciple_id = ${req.params.discipeId};`




    switch (req.params.order) {
        case "0":
            break;
        case "1":
            sqlQuery += `ORDER BY level ASC LIMIT ${rowStart}, 100`
            break;
        case "2":
            sqlQuery += `SELECT * FROM recipes where disciple_id = ${req.params.discipeId} ORDER BY level DESC LIMIT ${rowStart}, 100`
            break;
        case "3":
            sqlQuery += `SELECT * FROM recipes where disciple_id = ${req.params.discipeId} ORDER BY name ASC LIMIT ${rowStart}, 100`
            break;
        case "4":
            sqlQuery += `SELECT * FROM recipes where disciple_id = ${req.params.discipeId} ORDER BY name DESC LIMIT ${rowStart}, 100`
            break;
        default:
            throw new Error((message) => {
                console.log(message)
            });
    }

    db.query(sqlQuery, (err, results) => {

        if (err) {

            throw err;
        }

        res.send(JSON.parse(JSON.stringify(results)));
    })
});


module.exports = router;