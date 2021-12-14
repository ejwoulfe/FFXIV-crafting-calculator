import './recipes-list.scss';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import RecipeObject from '../../interfaces/recipe-interface';
import Pagination from './pagination/pagination';
import RecipeRow from './recipe-row/recipe-row';

export default function RecipesList() {
    const { disciple } = useParams()
    const [recipeList, setRecipeList] = useState<Array<RecipeObject>>();
    const [discipleID, setDiscipleID] = useState<number>();
    const discipleImages = require.context('../../assets/disciple-icons/', true);
    let filePath = discipleImages(`./${disciple}.png`).default;

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

                let listQuery = await fetch('http://localhost:5000/disciple/id/' + discipleID);
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


    function createRecipesList(recipesList: Array<RecipeObject>) {

        return recipesList?.map((recipe: RecipeObject, index: number) => {

            // Insert Pagination Here. Good Luck!

            if (index > 600 && index < 700) {
                return (
                    <RecipeRow currentRecipe={recipe} key={"recipe-row-" + index} />
                )
            }
        })
    }



    return (
        <div id="list-container">
            <img id="disciple-icon" src={filePath} alt={disciple + "icon"} />
            <div id="rows-container">
                {recipeList !== undefined ? createRecipesList(recipeList) : <div className="loading-spinner"></div>}
            </div>
        </div>
    );
}
