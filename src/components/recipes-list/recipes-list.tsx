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
    // Redux
    const dispatch = useDispatch();



    // Component State
    const [filteredList, setFilteredList] = useState<Array<RecipeObject>>([]);
    const [displayList, setDisplayList] = useState<Array<RecipeObject>>([]);
    const [abortController, setAbortController] = useState<AbortController>(new AbortController());
    const [loaded, setLoaded] = useState<boolean>(false);




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
            setLoaded(true)
        }
    }, [disciple, dispatch])

    useEffect(() => {
        console.log("something changed")
    }, [filter])

    // 1: Recipe Level Ascending
    // 2: Recipe Level Descending
    // 3: Recipe Names A-Z
    // 4: Recipe Names Z-A
    // switch (event.target.value) {
    //     case "0":
    //         break;
    //     case "1":
    //         let ascendingList = [...props.data.recipesList.sort((a, b) => (a.level > b.level ? 1 : -1))];
    //         props.data.setFilteredList(ascendingList);
    //         break;
    //     case "2":
    //         let descendingList = [...props.data.recipesList.sort((a, b) => (a.level > b.level ? -1 : 1))];
    //         props.data.setFilteredList(descendingList);

    //         break;
    //     case "3":
    //         let aToZList = [...props.data.recipesList.sort((a, b) => (a.name > b.name ? 1 : -1))];
    //         props.data.setFilteredList(aToZList);

    //         break;
    //     case "4":
    //         let zToAList = [...props.data.recipesList.sort((a, b) => (a.name > b.name ? -1 : 1))];
    //         props.data.setFilteredList(zToAList);

    //         break;
    //     default:
    //         break;
    // }





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
                {loaded === true ? <Pagination data={{ abortController, setAbortController }} /> : null}

                {loaded === true
                    ? <Filter data={{ abortController, setAbortController }} />
                    : null}
            </div>
            {/*
            <div id="rows-container">
                {(displayList.length > 0 && abortController.signal.aborted !== true)
                    ? createRecipesList(displayList, abortController)
                    : <div className="loading-spinner"></div>}
            </div> */}
        </div>
    );
}
