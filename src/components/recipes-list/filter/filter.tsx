import { useEffect, useState } from 'react';
import './filter.scss';

interface FilterProps {
    setFilterQuery: React.Dispatch<React.SetStateAction<string | null>>,
    sortByQuery: string,
    setSortByQuery: React.Dispatch<React.SetStateAction<string>>,
    abortController: AbortController
}

function Filter(props: { options: FilterProps }) {


    function sortOptionChanged(event: any) {
        props.options.setSortByQuery(event.target.value);
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
        props.options.setFilterQuery(target.value);
    }

    return (
        <div id="filter-and-sort">
            <div id="filter-container">
                <input id="keyword-input" autoComplete="false" onKeyUp={event => handleKeyword(event)} type="text" placeholder="ENTER A KEYWORD..." />

            </div>
            <div id="sort-by-container">
                <label>Sort By: </label>
                {createSortByDropDown(props.options.sortByQuery)}
            </div>
        </div>
    );
}

export default Filter;