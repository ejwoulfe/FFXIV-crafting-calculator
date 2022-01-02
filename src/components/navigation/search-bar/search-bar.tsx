import React, { useEffect, useState } from 'react';
import RecipeObject from '../../../interfaces/recipe-interface';
import searchIcon from '../../../assets/ui-icons/search.svg';
import './search-bar.scss';


export default function SearchBar({ setList }: { setList: React.Dispatch<React.SetStateAction<Array<RecipeObject>>> }) {

    const [searchTerm, setSearchTerm] = useState<string | null>(null);


    /* When search term changes and is not null and is longer than 2 characters we perform a search query on our database.
       Put in a delay timer so we aren't querying our database for every keystroke. Wait 1 second after the last keyup event. */
    useEffect(() => {

        if (searchTerm !== null && searchTerm.length >= 2) {
            fetch('http://localhost:5000/recipes/name/' + searchTerm)
                .then(response => response.json())
                .then(results => setList(results))
                .catch((error) => {
                    throw new Error(error);
                })
        }

    }, [searchTerm, setList])

    function handleChange(event: any) {
        setSearchTerm(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        // Cast the target to an html input element to get the value.
        const target = event.target as HTMLInputElement;

    }

    function createSortByDropDown() {
        let options = ["All", "Alchemist", "Armorer", "Blacksmith", "Carpenter", "Culinarian", "Goldsmith", "Leatherworker", "Weaver"];


        return (
            <select id="sort-drop-down" onChange={() => { console.log("clicked") }}>
                {options.map((text, index) => {

                    return <option key={"option-" + index} value={index}>{text}</option>

                })}
            </select>
        )
    }

    return (
        <form id="search-form" onSubmit={(e) => { handleSubmit(e) }}>
            {createSortByDropDown()}
            <input id="search-bar"
                autoComplete="false"
                type="text"
                onChange={(e) => { handleChange(e) }}
                placeholder="SEARCH FOR A RECIPE..." />
            <input id="search-button" type="submit" value="Submit" />
        </form>
    )
}