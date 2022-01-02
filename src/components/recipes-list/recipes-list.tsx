import './recipes-list.scss';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import RecipeObject from '../../interfaces/recipe-interface';
import RecipeRow from './recipe-row/recipe-row';
import Pagination from './pagination/pagination';
import Filter from './filter/filter';


export default function RecipesList() {

    // Router Variable
    const { disciple } = useParams();

    // Component State
    const [recipesList, setRecipesList] = useState<Array<RecipeObject>>([]);
    const [abortController, setAbortController] = useState<AbortController>(new AbortController());
    const [slicedList, setSlicedList] = useState<Array<RecipeObject>>([]);


    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const respone = await fetch('http://localhost:5000/disciple/id&=' + disciple + '/recipes', { signal: controller.signal });
                const recipes = await respone.json();
                setRecipesList(recipes);
                setSlicedList(recipes.slice(0, 100))

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


    function createRecipesList(list: Array<RecipeObject>, controller: AbortController) {
        if (controller.signal.aborted !== true) {

            return list.map((recipe: RecipeObject, index: number) => {
                return (
                    <RecipeRow data={{ recipe, controller }} key={"recipe-row-" + index} />
                )
            })

        }
    }

    return (
        <div id="list-container">
            <div id="pagination-and-filter">
                {slicedList.length > 0 && abortController !== undefined
                    ? <Pagination data={{ recipesList, setSlicedList, abortController, setAbortController }} />
                    : null}

                {slicedList.length > 0 && abortController !== undefined
                    ? <Filter data={{ recipesList, setRecipesList, setSlicedList, abortController, setAbortController }} />
                    : null}
            </div>
            <div id="rows-container">
                {(slicedList.length > 0 && abortController.signal.aborted !== true)
                    ? createRecipesList(slicedList, abortController)
                    : <div className="loading-spinner"></div>}
            </div>
        </div>
    );
}
