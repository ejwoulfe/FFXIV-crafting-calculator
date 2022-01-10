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
    const filter = useSelector((state: RootState) => state.recipesData);
    const currentPage = useSelector((state: RootState) => state.pageData.page);
    // Redux
    const dispatch = useDispatch();



    // Component State
    const [filteredList, setFilteredList] = useState<Array<RecipeObject>>([]);
    const [totalRecipes, setTotalRecipes] = useState<number>(0);
    const [displayList, setDisplayList] = useState<Array<RecipeObject>>([]);
    const [abortController, setAbortController] = useState<AbortController>(new AbortController());
    const [loading, setLoading] = useState<boolean>(true);




    // useEffect(() => {
    //     setCurrentPage(1)
    //     setTotalPages(Math.ceil(filteredList.length / rowLimit))
    // }, [filteredList])

    // useEffect(() => {

    //     let startIndex = (currentPage - 1) * 100;
    //     let endIndex = startIndex + 100;
    //     setDisplayList([...filteredList.slice(startIndex, endIndex)])

    // }, [currentPage, filteredList])

    // Whenever we have a new disciple, which is only when a user goes to a different disciple page,
    // reset all values back to default and fetch the new recipes.
    useEffect(() => {
        if (disciple !== undefined) {
            dispatch(reset())
            dispatch(fetchAsyncRecipes(disciple))
        }
    }, [disciple, dispatch])

    useEffect(() => {

        function filterList(list: Array<RecipeObject>, keyword: string, sort: number) {

            let newList: Array<RecipeObject> = [];
            let keywordList: Array<RecipeObject> = [];

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

    useEffect(() => {
        setLoading(true);
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
        // let startIndex = (currentPage - 1) * 100;
        // let endIndex = startIndex + 100;
        // let displayList = list.slice(startIndex, endIndex);
        return list.map((recipe: RecipeObject, index: number) => {

            return (
                <RecipeRow data={{ recipe, controller }} key={"recipe-row-" + index} />
            )
        })


    }

    return (
        <div id="list-container">

            <div id="pagination-and-filter">
                {filteredList.length > 0 ? <Pagination data={{ totalRecipes, abortController, setAbortController }} /> : null}

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
