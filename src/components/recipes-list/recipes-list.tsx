import './recipes-list.scss';
import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import RecipeObject from '../../interfaces/recipe-interface';
import RecipeRow from './recipe-row/recipe-row';
import Pagination from './pagination/pagination';

export default function RecipesList() {

    const { disciple } = useParams();
    const location = useLocation();
    const { name } = location.state;
    const discipleImages = require.context('../../assets/disciple-icons/', true);
    let filePath = discipleImages(`./${name}.png`).default;
    const [recipeList, setRecipeList] = useState<Array<RecipeObject>>();
    const [isCanceled, setIsCanceled] = useState<boolean>(false);
    const [isDoneLoading, setIsDoneLoading] = useState<boolean>(false);

    // Current per page limit is 100.
    const rowLimit = 100;

    // State that is changed by its children components

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>();


    // We need a number ID in order to fetch from our database, switch statement to assign a number depending on the disciple.
    useEffect(() => {
        const controller = new AbortController();
        console.log("Page has changed. Page is: " + currentPage);
        setIsDoneLoading(false);

        fetch('http://localhost:5000/disciple/id&=' + disciple + '/page&=' + currentPage, { signal: controller.signal })
            .then((response) => {
                return response.json();
            })
            .then((recipes) => {
                setRecipeList(recipes);
                setIsCanceled(false);
            })
            .catch((error) => {
                if (error.name === "AbortError") {
                    setIsCanceled(true);
                    console.log(error.message)
                } else {
                    console.log(error.message)
                }
            });

        return () => {
            controller.abort();
        };

    }, [disciple, currentPage]);

    useEffect(() => {

        fetch('http://localhost:5000/disciple/id&=' + disciple)
            .then((response) => response.json())
            .then((rows) => {

                let numOfRows = (Object.values(rows[0])[0]) as number
                setTotalPages(Math.ceil(numOfRows / rowLimit))
            })
            .catch((error) => console.log(error.message));
    }, [disciple])



    function createRecipesList(recipesList: Array<RecipeObject>) {

        // console.log("calling create")

        let rows = recipesList.map((recipe: RecipeObject, index: number) => {

            return (
                <RecipeRow currentRecipe={{ recipe, index, setIsDoneLoading }} key={"recipe-row-" + index} />
            )

        });

        return rows;
    }


    return (
        <div id="list-container">
            <img id="disciple-icon" src={filePath} alt={disciple + "icon"} />
            {totalPages !== undefined ? <Pagination pageData={{ currentPage, setCurrentPage, totalPages, isDoneLoading }} /> : null}
            <div id="rows-container">
                {recipeList !== undefined && isCanceled === false
                    ? createRecipesList(recipeList)
                    : <div className="loading-spinner"></div>}
            </div>
        </div>
    );
}
