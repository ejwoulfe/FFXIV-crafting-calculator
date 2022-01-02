import React, { useEffect, useState } from 'react';
import './search-bar.scss';
import RecipeObject from '../../../interfaces/recipe-interface';



export default function SearchBar({ setList }: { setList: React.Dispatch<React.SetStateAction<Array<RecipeObject>>> }) {

    const [searchTerm, setSearchTerm] = useState<string | null>(null);


    /* When search term changes and is not null and is longer than 2 characters we perform a search query on our database.
       Put in a delay timer so we aren't querying our database for every keystroke. Wait 1 second after the last keyup event. */
    useEffect(() => {

        try {

            if (searchTerm !== null && searchTerm.length >= 2) {
                fetch('http://localhost:5000/recipes/name/' + searchTerm)
                    .then(response => response.json())
                    .then(results => setList(results));
            }

        } catch (error: any) {
            throw new Error(error);
        }

    }, [searchTerm, setList])

    function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {

        event.preventDefault();
        // Cast the target to an html input element to get the value.
        const target = event.target as HTMLInputElement;
        setTimeout(() => {
            setSearchTerm(target.value);
        }, 2000)
    }

    return (
        <input id="search-bar" autoComplete="false" onKeyUp={event => handleSearch(event)} type="text" placeholder="SEARCH FOR A RECIPE..." />
    )
}