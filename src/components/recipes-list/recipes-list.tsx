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
    const [slicedRecipesList, setSlicedRecipesList] = useState<Array<RecipeObject>>([]);
    const [recipesLoaded, setRecipesLoaded] = useState<boolean>(false);
    const [abortController, setAbortController] = useState<AbortController>(new AbortController());


    // State that is changed by its children components

    const [filterQuery, setFilterQuery] = useState<string | null>(null);
    const [sortByQuery, setSortByQuery] = useState<string>("0");


    // We need a number ID in order to fetch from our database, switch statement to assign a number depending on the disciple.
    // useEffect(() => {
    //     const controller = new AbortController();
    //     setAbortController(controller);
    //     (async () => {

    //         setRecipesLoaded(false);
    //         try {

    //             if (sortByQuery === "0") {
    //                 const respone = await fetch('http://localhost:5000/disciple/id&=' + disciple + '/page&=' + currentPage, { signal: controller.signal });
    //                 const recipes = await respone.json();
    //                 setRecipeList(recipes);
    //                 setRecipesLoaded(true);
    //             } else {
    //                 const respone = await fetch('http://localhost:5000/disciple/id&=' + disciple + '/page&=' + currentPage + '/order&=' + sortByQuery, { signal: controller.signal });
    //                 const recipes = await respone.json();
    //                 setRecipeList(recipes);
    //                 setRecipesLoaded(true);
    //             }


    //         } catch (error: any) {
    //             if (error.name === 'AbortError') {
    //                 console.log('Request aborted.')
    //             } else {
    //                 console.log(error)
    //             }
    //         }
    //     })();

    //     return () => {
    //         controller.abort();
    //     }

    // }, [currentPage, disciple, sortByQuery])

    useEffect(() => {
        const controller = new AbortController();
        (async () => {

            setRecipesLoaded(false);
            try {

                const respone = await fetch('http://localhost:5000/disciple/id&=' + disciple + '/recipes', { signal: controller.signal });
                const recipes = await respone.json();
                setRecipesList(recipes);
                setSlicedRecipesList(recipes.slice(0, 100));
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

    function createRecipesList(list: Array<RecipeObject>, controller: AbortController) {
        let listLength = list.length - 1;

        if (controller.signal.aborted !== true) {
            return list.map((recipe: RecipeObject, index: number) => {
                return (
                    <RecipeRow currentRecipe={{ recipe, index, listLength, abortController }} key={"recipe-row-" + index} />
                )
            })
        } else {
            return null;
        }
    }


    return (
        <div id="list-container">
            <div id="pagination-and-filter">
                {recipesLoaded && abortController !== undefined
                    ? <Pagination data={{ recipesList, setSlicedRecipesList, abortController, setAbortController }} />
                    : null}

                {recipesLoaded && abortController !== undefined
                    ? <Filter options={{ setFilterQuery, sortByQuery, setSortByQuery, abortController }} />
                    : null}
            </div>
            <div id="rows-container">
                {recipesLoaded && abortController.signal.aborted !== true
                    ? createRecipesList(slicedRecipesList, abortController)
                    : <div className="loading-spinner"></div>}
            </div>
        </div>
    );
}
