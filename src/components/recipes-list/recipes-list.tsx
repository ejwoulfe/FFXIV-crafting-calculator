import './recipes-list.scss';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import RecipeObject from '../../interfaces/recipe-interface';
import RecipeRow from './recipe-row/recipe-row';
import Pagination from './pagination/pagination';

export default function RecipesList() {

    const { disciple } = useParams();
    const [discipleID, setDiscipleID] = useState<number>();
    const discipleImages = require.context('../../assets/disciple-icons/', true);
    let filePath = discipleImages(`./${disciple}.png`).default;
    const [recipeList, setRecipeList] = useState<Array<RecipeObject>>();

    // Current per page limit is 100.
    const rowLimit = 100;

    // State that is changed by its children components

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>();



    // We need a number ID in order to fetch from our database, switch statement to assign a number depending on the disciple.
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

        async function fetchDiscipleRecipes(page: number) {
            try {

                let listQuery = await fetch('http://localhost:5000/disciple/id&=' + discipleID + '/page&=' + page);
                let results = await listQuery.json();
                setRecipeList(results);


            } catch (error: any) {

                throw new Error(error);

            }
        }

        if (discipleID !== undefined) {
            fetchDiscipleRecipes(currentPage)
        }



    }, [currentPage, discipleID])


    useEffect(() => {

        async function fetchNumberOfRecipes() {
            try {

                let rowsQuery = await fetch('http://localhost:5000/disciple/id&=' + discipleID);
                let rowsJSON = await rowsQuery.json();
                let numOfRows = (Object.values(rowsJSON[0])[0]) as number
                // Total number of pages will be the number of total rows divided by 100 rows per page, rounded up.
                setTotalPages(Math.ceil(numOfRows / rowLimit));


            } catch (error: any) {

                throw new Error(error);

            }
        }


        if (discipleID !== undefined) {
            fetchNumberOfRecipes();
        }


    }, [discipleID])


    function createRecipesList(recipesList: Array<RecipeObject>) {

        return recipesList?.map((recipe: RecipeObject, index: number) => {

            return (
                <RecipeRow currentRecipe={recipe} key={"recipe-row-" + index} />
            )

        })
    }


    return (
        <div id="list-container">
            <img id="disciple-icon" src={filePath} alt={disciple + "icon"} />
            {totalPages !== undefined ? <Pagination pageData={{ currentPage, setCurrentPage, totalPages }} /> : null}
            <div id="rows-container">
                {recipeList !== undefined ? createRecipesList(recipeList) : <div className="loading-spinner"></div>}
            </div>
        </div>
    );
}
