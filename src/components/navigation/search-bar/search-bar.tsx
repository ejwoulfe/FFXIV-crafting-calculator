import React, { useEffect, useState } from 'react';
import './search-bar.scss';

export default function SearchBar() {

    const [searchTerm, setSearchTerm] = useState<string | null>(null);


    /* When search term changes and is not null and is longer than 2 characters we perform a search query on our database.
       Put in a delay timer so we aren't querying our database for every keystroke. Wait 1 second after the last keyup event. */
    useEffect(() => {
        const delay = setTimeout(async () => {
            try {

                if (searchTerm !== null && searchTerm.length >= 2) {
                    let searchQuery = await fetch('http://localhost:5000/recipes/' + searchTerm);
                    let results = await searchQuery.json();
                    console.log(results);
                }

            } catch (error: any) {
                throw new Error(error);
            }
        }, 1000)

        // Clean up
        return () => clearTimeout(delay)

    }, [searchTerm])


    function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {

        event.preventDefault();
        // Cast the target to an html input element to get the value.
        const target = event.target as HTMLInputElement;
        setSearchTerm(target.value);
    }

    return (
        <input id="search-bar" onKeyUp={event => handleSearch(event)} type="text" placeholder="SEARCH FOR AN ITEM..." />
    )
}