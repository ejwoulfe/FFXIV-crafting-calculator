import React, { useEffect, useState } from 'react';
import RecipeObject from '../../../interfaces/recipe-interface';
import createDropDown from '../../dropdown';
import SearchList from './search-list/search-list';
import './search-bar.scss';


export default function SearchBar() {

    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [discipleOption, setDiscipleOption] = useState<number>(0);
    const [searchResults, setSearchResults] = useState<Array<RecipeObject>>([]);
    const [showRecipeList, setShowRecipeList] = useState<boolean>(false);
    const [filteredSearchResults, setFilteredSearchResults] = useState<Array<RecipeObject>>([]);


    function handleChange(event: any) {
        setSearchTerm(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (searchTerm !== null && searchTerm.length >= 2) {
            fetch(`http://ffxivcc-database.c2wc6vilznc5.us-east-2.rds.amazonaws.com/recipes/name/${searchTerm}`)
                .then(response => response.json())
                .then((results) => {
                    setSearchResults(results)
                    setFilteredSearchResults(results)
                    setShowRecipeList(true);
                })
                .catch((error) => {
                    throw new Error(error);
                })

        }

    }

    useEffect(() => {


        //  Whenever search results changes or disciple options changes we will filter the results gathered by our api,which is held within the searchReults state array.
        //  This filter will be based off which disciple the user wants to browse recipes in.
        if (searchResults.length > 0) {
            setShowRecipeList(true);
            if (discipleOption === 0) {
                setFilteredSearchResults([...searchResults]);
            } else {
                setFilteredSearchResults(searchResults.filter(recipes => recipes.disciple_id === discipleOption));
            }
        }
    }, [discipleOption, searchResults])

    // When the user clicks on anything outside of the search form, we hide the search list.
    useEffect(() => {

        let detectClick = (event: any) => {

            if (event.path.includes(document.getElementById('search-form'))) {
                setShowRecipeList(true)
            } else {
                setShowRecipeList(false);
            }
        }

        window.addEventListener('click', detectClick)

        return () => {

            window.removeEventListener('click', detectClick);
        }
    }, []);


    function dropDownOptionChanged(event: any) {
        setDiscipleOption(parseInt(event.target.value));
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
            {showRecipeList ? <SearchList searchResults={filteredSearchResults} /> : null}
        </>
    )
}