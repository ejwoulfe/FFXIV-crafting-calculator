import './recipes-list.scss';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import RecipeObject from '../../interfaces/recipe-interface';
import Pagination from './pagination/pagination';

export default function RecipesList() {
    const { disciple } = useParams()
    const [recipeList, setRecipeList] = useState<RecipeObject[]>();
    const [discipleID, setDiscipleID] = useState<number>();


    useEffect(() => {
        switch (disciple) {
            case "alchemist":
                setDiscipleID(1);
                break;
            case "armorer":
                setDiscipleID(2);
                break;
            case "blacksmith":
                setDiscipleID(3);
                break;
            case "carpenter":
                setDiscipleID(4);
                break;
            case "culinarian":
                setDiscipleID(5);
                break;
            case "goldsmith":
                setDiscipleID(6);
                break;
            case "leatherworker":
                setDiscipleID(7);
                break;
            case "weaver":
                setDiscipleID(8);
                break;
        }
    }, [disciple])


    useEffect(() => {

        async function fetchDiscipleRecipes() {

            try {

                let listQuery = await fetch('http://localhost:5000/disciple/' + discipleID);
                let results = await listQuery.json();
                setRecipeList(results);

            } catch (error: any) {

                throw new Error(error);

            }
        }

        if (discipleID !== undefined) {
            fetchDiscipleRecipes();
        }

    }, [discipleID]);


    function createRecipesList(recipesList: RecipeObject[]) {

        // disciple_id: 1
        // icon: "alchemist/rainbow-moth-orchid-corsage.png"
        // item_level: 1
        // level: 73
        // link: "https://na.finalfantasyxiv.com/lodestone/playguide/db/recipe/4619e66f8f3/"
        // name: "Rainbow Moth Orchid Corsage"
        // recipe_id: 2249
        // total_crafted: 1
        // type: "null"

        return recipeList?.map((recipe, index) => {

            return (
                <div className="recipe-item-row" key={"row-" + index}>
                    <h4>{recipe.name}</h4>
                </div>
            )
        })
    }



    return (
        <div id="list-container">
            <h1>{disciple}</h1>
            <div id="cards-container">

                {recipeList !== undefined ? createRecipesList(recipeList) : <h1>Loading Recipes</h1>}
            </div>
        </div>
    );
}
