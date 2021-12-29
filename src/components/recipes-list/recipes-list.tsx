import './recipes-list.scss';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import RecipeObject from '../../interfaces/recipe-interface';
import RecipeRow from './recipe-row/recipe-row';
import Pagination from './pagination/pagination';
import Filter from './filter/filter';
import useData from './logic';

export default function RecipesList() {

    // Router Variable
    const { disciple } = useParams();

    // Component State
    const [recipesList, setRecipesList] = useState<Array<RecipeObject>>([]);
    const [recipesLoaded, setRecipesLoaded] = useState<boolean>(false);
    const [abortController, setAbortController] = useState<AbortController>(new AbortController());
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { dataChanged, slicedData, setSlicedData } = useData();

    useEffect(() => {
        const controller = new AbortController();
        (async () => {

            setRecipesLoaded(false);
            try {

                const respone = await fetch('http://localhost:5000/disciple/id&=' + disciple + '/recipes', { signal: controller.signal });
                const recipes = await respone.json();
                setRecipesList(recipes);
                // On initial load of a new disciples page we fill the sliced array with the first 100 recipes and set recipes loaded to true.
                //setSlicedRecipesList(recipes.slice(0, 100));
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
    }, [disciple]);

    useEffect(() => {
        if (recipesLoaded === true) {
            setSlicedData(recipesList.slice(0, 100));
            console.log(slicedData)
        }
    }, [recipesLoaded, setSlicedData, recipesList])

    function createRecipesList(list: Array<RecipeObject>, controller: AbortController) {
        let listLength = list.length - 1;

        if (controller.signal.aborted !== true) {
            return list.map((recipe: RecipeObject, index: number) => {
                return (
                    <RecipeRow data={{ recipe, index, listLength, controller }} key={"recipe-row-" + index} />
                )
            })
        }
    }



    return (
        <div id="list-container">
            {/* <div id="pagination-and-filter">
                {recipesLoaded && abortController !== undefined
                    ? <Pagination data={{ abortController, setAbortController}} />
                    : null}

                {slicedRecipesList.length > 0 && abortController !== undefined
                    ? <Filter data={{abortController, setAbortController }} />
                    : null}
            </div>
            <div id="rows-container">
                {(recipesLoaded && slicedRecipesList.length > 0 && abortController.signal.aborted !== true)
                    ? createRecipesList(slicedRecipesList, abortController)
                    : <div className="loading-spinner"></div>}
            </div> */}
        </div>
    );
}
