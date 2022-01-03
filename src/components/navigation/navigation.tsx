
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './search-bar/search-bar';
import crystal from '../../assets/navigation-icons/crystal.png';
import './navigation.scss';
import ServerList from './server-list/server-list';
import SearchList from './search-bar/search-list/search-list';
import { ServerContext } from '../../context/ServerContext';
import RecipeObject from '../../interfaces/recipe-interface';

export default function Navigation() {

    const { server } = useContext(ServerContext);
    const [showServerList, setShowServerList] = useState<boolean>(false);






    // The only situation we want the drop down to be visible is when the user clicks on the button.
    // So hide the menu on a click that isn't the drop down menu button.
    let detectClick = (event: any) => {
        if (event.target.id !== 'crystal-image') {
            setShowServerList(false);
        }
        // if (event.target.className !== 'recipe-list-item') {
        //     setShowRecipeList(false);
        // } if (event.target.id === 'search-bar' && event.target.value.length >= 2) {
        //     setShowRecipeList(true);
        // }
    }

    return (
        <nav id="navigation">
            <Link to="/" id="logo" />

            <div id="nav-items">
                <div id="search-bar-container">
                    <SearchBar />

                </div>
                <div id="server">
                    {server}
                </div>
                <div id="crystal" onClick={() => { setShowServerList(!showServerList) }} >
                    <img id="crystal-image" src={crystal} alt="crystal" />
                </div>
                {showServerList ? <ServerList /> : null}
            </div>
        </nav>
    )
}