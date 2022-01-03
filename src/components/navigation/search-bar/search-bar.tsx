import React, { useEffect, useState } from 'react';
import RecipeObject from '../../../interfaces/recipe-interface';
import searchIcon from '../../../assets/ui-icons/search.svg';
import createDropDown from '../../dropdown';
import SearchList from './search-list/search-list';
import './search-bar.scss';


export default function SearchBar() {

    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [discipleOption, setDiscipleOption] = useState<number>(0);
    const [searchResults, setSearchResults] = useState<Array<RecipeObject>>([]);
    const [showRecipeList, setShowRecipeList] = useState<boolean>(false);

    function handleChange(event: any) {
        setSearchTerm(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (searchTerm !== null && searchTerm.length >= 2) {
            // If disciple option is 0 we look through all the recipes.
            if (discipleOption === 0) {
                fetch(`http://localhost:5000/recipes/name/${searchTerm}`)
                    .then(response => response.json())
                    .then((results) => {
                        setSearchResults(results)
                        setShowRecipeList(true);
                    })
                    .catch((error) => {
                        throw new Error(error);
                    })

                // if disciple option has a value we look through all recipes within that disciple
            } else {
                fetch(`http://localhost:5000/recipes/${discipleOption}/name/${searchTerm}`)
                    .then(response => response.json())
                    .then((results) => {
                        setSearchResults(results)
                        setShowRecipeList(true);
                    })
                    .catch((error) => {
                        throw new Error(error);
                    })
            }

        }

    }

    // useEffect(() => {

    //     window.addEventListener('click', detectClick)

    //     return () => {

    //         window.removeEventListener('click', detectClick);
    //     }
    // }, []);

    function dropDownOptionChanged(event: any) {
        setDiscipleOption(event.target.value)
    }

    return (
        <>
            <form id="search-form" onSubmit={(e) => { handleSubmit(e) }}>
                {createDropDown(["All", "Alchemist", "Armorer", "Blacksmith", "Carpenter", "Culinarian", "Goldsmith", "Leatherworker", "Weaver"], dropDownOptionChanged)}
                <input id="search-bar"
                    autoComplete="false"
                    type="text"
                    onChange={(e) => { handleChange(e) }}
                    placeholder="SEARCH FOR A RECIPE..." />
                <input id="search-button" type="submit" value="" />
            </form>
            {showRecipeList ? <SearchList recipes={searchResults} /> : null}
        </>
    )
}