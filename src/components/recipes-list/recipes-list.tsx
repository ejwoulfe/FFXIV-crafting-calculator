import './recipes-list.scss';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import RecipeObject from '../../interfaces/recipe-interface';
import RecipeRow from './recipe-row/recipe-row';
import Pagination from './pagination/pagination';

export default function RecipesList() {

    // Router Variable
    const { disciple } = useParams();

    const [recipeList, setRecipeList] = useState<Array<RecipeObject>>([]);
    const [recipesLoaded, setRecipesLoaded] = useState<boolean>(false);
    const [abortController, setAbortController] = useState<AbortController>();




    // Current per page limit is 100.
    const rowLimit = 100;

    // State that is changed by its children components

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>();


    // We need a number ID in order to fetch from our database, switch statement to assign a number depending on the disciple.
    useEffect(() => {
        const controller = new AbortController();
        setAbortController(controller);
        (async () => {

            setRecipesLoaded(false);
            try {
                const respone = await fetch('http://localhost:5000/disciple/id&=' + disciple + '/page&=' + currentPage, { signal: controller.signal });
                const recipes = await respone.json();
                setRecipeList(recipes);
                setRecipesLoaded(true);

            } catch (error: any) {
                if (error.name === 'AbortError') {
                    console.log('Request aborted.')
                } else {
                    console.log(error)
                }
            }
        })();

        return () => {
            controller.abort();
        }

    }, [currentPage, disciple])

    // Whenever the user navigates to a new disciple, we want to calculate the total amount of pages we will need for our pagination.
    useEffect(() => {

        fetch('http://localhost:5000/disciple/id&=' + disciple)
            .then((response) => response.json())
            .then((rows) => {

                let numOfRows = (Object.values(rows[0])[0]) as number
                setTotalPages(Math.ceil(numOfRows / rowLimit))
            })
            .catch((error) => console.log(error.message));
    }, [disciple])



    function createRecipesList(list: Array<RecipeObject>) {
        let listLength = list.length - 1;

        return list.map((recipe: RecipeObject, index: number) => {
            if (abortController !== undefined) {
                return (
                    <RecipeRow currentRecipe={{ recipe, index, listLength, abortController }} key={"recipe-row-" + index} />
                )
            } else {
                return null;
            }

        });
    }


    return (
        <div id="list-container">

            {totalPages !== undefined && abortController !== undefined
                ? <Pagination pageData={{ currentPage, setCurrentPage, totalPages, abortController }} />
                : null}

            <div id="rows-container">

                {recipesLoaded && abortController !== undefined
                    ? createRecipesList(recipeList)
                    : <div className="loading-spinner"></div>}

            </div>
        </div>
    );
}
