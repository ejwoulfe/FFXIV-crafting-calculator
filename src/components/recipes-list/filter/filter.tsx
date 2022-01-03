import { useEffect, useState } from 'react';
import RecipeObject from '../../../interfaces/recipe-interface';
import createDropDown from '../../dropdown';
import './filter.scss';

interface FilterProps {
    recipesList: Array<RecipeObject>,
    setRecipesList: React.Dispatch<React.SetStateAction<Array<RecipeObject>>>,
    setSlicedList: React.Dispatch<React.SetStateAction<Array<RecipeObject>>>,
    abortController: AbortController,
    setAbortController: React.Dispatch<React.SetStateAction<AbortController>>
}

function Filter(props: { data: FilterProps }) {


    const [keyword, setKeyword] = useState<string | null>(null);


    function sortOptionChanged(event: any) {

        props.data.abortController.abort();
        props.data.setAbortController(new AbortController());
        //setSortByQuery(event.target.value);
        // 1: Recipe Level Ascending
        // 2: Recipe Level Descending
        // 3: Recipe Names A-Z
        // 4: Recipe Names Z-A
        switch (event.target.value) {
            case "0":
                break;
            case "1":
                let ascendingList = [...props.data.recipesList.sort((a, b) => (a.level > b.level ? 1 : -1))];
                props.data.setRecipesList(ascendingList);
                props.data.setSlicedList(ascendingList.slice(0, 100));
                break;
            case "2":
                let descendingList = [...props.data.recipesList.sort((a, b) => (a.level > b.level ? -1 : 1))];
                props.data.setRecipesList(descendingList);
                props.data.setSlicedList(descendingList.slice(0, 100));
                break;
            case "3":
                let aToZList = [...props.data.recipesList.sort((a, b) => (a.name > b.name ? 1 : -1))];
                props.data.setRecipesList(aToZList);
                props.data.setSlicedList(aToZList.slice(0, 100));
                break;
            case "4":
                let zToAList = [...props.data.recipesList.sort((a, b) => (a.name > b.name ? -1 : 1))];
                props.data.setRecipesList(zToAList);
                props.data.setSlicedList(zToAList.slice(0, 100));
                break;
            default:
                break;
        }
    }


    useEffect(() => {
        const timer = setTimeout(() => console.log(keyword), 2000);
        return () => clearTimeout(timer);
    }, [keyword])

    useEffect(() => {
        console.log("rendering")
    })

    function handleKeyword(event: React.KeyboardEvent<HTMLInputElement>) {

        event.preventDefault();
        // Cast the target to an html input element to get the value.
        const target = event.target as HTMLInputElement;

        let input = target.value;
        if (input !== null && input.length >= 1) {
            setKeyword(input);
        }

    }

    return (
        <div id="filter-and-sort">
            <div id="filter-container">
                <input id="keyword-input" autoComplete="false" onKeyUp={(event) => {

                    handleKeyword(event)
                }} type="text" placeholder="ENTER A KEYWORD..." />

            </div>
            <div id="sort-by-container">
                <label>Sort By: </label>
                {createDropDown(["-", "Recipe Level - Ascending", "Recipe Level - Descending", "Recipe Names A-Z", "Recipe Names Z-A"], sortOptionChanged)}
            </div>
        </div>
    );
}

export default Filter;