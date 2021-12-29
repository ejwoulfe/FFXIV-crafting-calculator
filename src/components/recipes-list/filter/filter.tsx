import { useEffect, useState } from 'react';
import RecipeObject from '../../../interfaces/recipe-interface';
import './filter.scss';

interface FilterProps {
    recipesList: Array<RecipeObject>,
    setRecipesList: React.Dispatch<React.SetStateAction<Array<RecipeObject>>>,
    setSlicedRecipesList: React.Dispatch<React.SetStateAction<Array<RecipeObject>>>,
    abortController: AbortController,
    setAbortController: React.Dispatch<React.SetStateAction<AbortController>>
}

function Filter(props: { data: FilterProps }) {


    const [filterQuery, setFilterQuery] = useState<string | null>(null);
    const [sortByQuery, setSortByQuery] = useState<string>("0");

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
                console.log("0")
                break;
            case "1":
                break;
            case "2":
                let newRecipesList = props.data.recipesList.sort((a, b) => (a.level > b.level ? -1 : 1));
                props.data.setRecipesList(newRecipesList);
                props.data.setSlicedRecipesList(newRecipesList.slice(0, 100));
                break;
            case "3":
                console.log("3")
                break;
            case "4":
                console.log("4")
                break;
            default:
                console.log("default")

        }

    }

    function createSortByDropDown(selected: string) {
        let options = ["-", "Recipe Level - Ascending", "Recipe Level - Descending", "Recipe Names A-Z", "Recipe Names Z-A"];


        return (
            <select id="sort-drop-down" defaultValue={selected} onChange={(e) => { sortOptionChanged(e) }}>
                {options.map((text, index) => {

                    return <option key={"option-" + index} value={index}>{text}</option>

                })}
            </select>
        )
    }


    function handleKeyword(event: React.KeyboardEvent<HTMLInputElement>) {
        event.preventDefault();
        // Cast the target to an html input element to get the value.
        const target = event.target as HTMLInputElement;
        setFilterQuery(target.value);
    }

    return (
        <div id="filter-and-sort">
            <div id="filter-container">
                <input id="keyword-input" autoComplete="false" onKeyUp={event => handleKeyword(event)} type="text" placeholder="ENTER A KEYWORD..." />

            </div>
            <div id="sort-by-container">
                <label>Sort By: </label>
                {createSortByDropDown(sortByQuery)}
            </div>
        </div>
    );
}

export default Filter;