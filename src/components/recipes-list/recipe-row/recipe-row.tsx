import { useEffect } from 'react';
import RecipeObject from '../../../interfaces/recipe-interface';

interface RowProps {
    currentRecipe: RecipeObject
}

function RecipeRow(props: RowProps) {

    let recipe = props.currentRecipe;

    async function fetchMaterials(recipeID: number) {

        try {

            let materialsQuery = await fetch('http://localhost:5000/materials/id/' + recipeID);
            let results = await materialsQuery.json();
            console.log(results)
            return results;

        } catch (error: any) {

            throw new Error(error);

        }
    }



    // disciple_id: 3
    // icon: "blacksmith/colibri-pink-dye.png"
    // item_level: null
    // level: 30
    // link: "https://na.finalfantasyxiv.com/lodestone/playguide/db/recipe/77b517e589e/"
    // name: "Colibri Pink Dye"
    // recipe_id: 1217
    // total_crafted: 1
    // type: "null"
    console.log(recipe)
    const images = require.context('../../../assets/recipe-icons/', true);
    let filePath = images(`./${recipe.icon}`).default;


    useEffect(() => {
        fetchMaterials(recipe.recipe_id);
    }, [recipe.recipe_id])

    return (
        <div id="recipe-row">
            <div className="recipe-info">
                <h2>{recipe.name}</h2>
                <img src={filePath} alt={`${recipe.name} icon`} />
                <p>{recipe.level}</p>
                <p>{recipe.item_level}</p>
                <p>{recipe.type}</p>
            </div>
            <div className="recipe-materials">


            </div>
            <div className="recipe-crystals">

            </div>

        </div>
    );
}

export default RecipeRow;