import './recipes-list.scss';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import RecipeObject from '../../interfaces/recipe-interface';
import RecipeRow from './recipe-row/recipe-row';
import Pagination from './pagination/pagination';
import Filter from './filter/filter';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../redux/store';
import { fetchAsyncRecipes, reset } from '../../redux/reducers/recipes-slice';



export default function RecipesList() {


    // Router Variable
    const { disciple } = useParams();

    // Redux
    const dispatch = useDispatch();
    const filter = useSelector((state: RootState) => state.recipesData);
    const currentPage = useSelector((state: RootState) => state.pageData.page);

    // Component State
    const [filteredList, setFilteredList] = useState<Array<RecipeObject>>([]);
    const [displayList, setDisplayList] = useState<Array<RecipeObject>>([]);
    const [totalRecipes, setTotalRecipes] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [abortController, setAbortController] = useState<AbortController>(new AbortController());


    useEffect(() => {
        if (disciple !== undefined) {
            dispatch(reset())
            dispatch(fetchAsyncRecipes(disciple))
        }
    }, [disciple, dispatch])

    useEffect(() => {

        // This function is responsible for creating a new list when given a new keyword or/and a new sort order.
        // It takes the recipesList from redux and then applies the appropriate filters/sorts.
        function filterList(list: Array<RecipeObject>, keyword: string, sort: number) {

            let keywordList: Array<RecipeObject> = [];
            let newList: Array<RecipeObject> = [];


            if (keyword !== "" && keyword.length >= 2) {
                keywordList = list.filter((recipe) => recipe.name.includes(keyword));

            } else {
                keywordList = [...list];
            }

            // 1: Recipe Level Ascending
            // 2: Recipe Level Descending
            // 3: Recipe Names A-Z
            // 4: Recipe Names Z-A
            switch (sort) {
                case 0:
                    newList = [...keywordList];
                    break;
                case 1:
                    newList = [...keywordList].sort((a, b) => (a.level > b.level ? 1 : -1));
                    break;
                case 2:
                    newList = [...keywordList].sort((a, b) => (a.level > b.level ? -1 : 1));
                    break;
                case 3:
                    newList = [...keywordList].sort((a, b) => (a.name > b.name ? 1 : -1));
                    break;
                case 4:
                    newList = [...keywordList].sort((a, b) => (a.name > b.name ? -1 : 1));
                    break;
                default:
                    newList = ([...keywordList]);
                    break;
            }


            setFilteredList(newList)
            setTotalRecipes(newList.length);
        }


        filterList(filter.recipes, filter.keyword, filter.sortNumber)

    }, [filter])

    // Whenever we change the page or we get a new filteredList(by sorting or filtering with a keyword) 
    // we want to rerender our component with the newly crafted filterlist, which is where we get out 100 rows of recipes from
    // which is being held withing or displayList state.
    useEffect(() => {
        setLoading(true);
        setAbortController(new AbortController());
        if (filteredList.length > 0) {
            let startIndex = (currentPage - 1) * 100;
            let endIndex = startIndex + 100;
            setDisplayList(filteredList.slice(startIndex, endIndex))
        }
    }, [currentPage, filteredList])

    useEffect(() => {
        if (displayList.length > 0) {
            setLoading(false);
        }
    }, [displayList]);








    function createRecipesList(list: Array<RecipeObject>, controller: AbortController) {

        return list.map((recipe: RecipeObject, index: number) => {
            return (
                <RecipeRow data={{ recipe, controller }} key={"recipe-row-" + index} />
            )
        })
    }

    return (
        <div id="list-container">

            <div id="pagination-and-filter">
                {filteredList.length > 0 ? <Pagination data={{ totalRecipes, abortController }} /> : null}

                {filteredList.length > 0
                    ? <Filter data={{ abortController, setAbortController }} />
                    : null}
            </div>

            <div id="rows-container">
                {loading === false
                    ? createRecipesList(displayList, abortController)
                    : null}
            </div>
        </div>
    );
}
