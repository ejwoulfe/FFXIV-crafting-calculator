
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../search-bar/search-bar';
import crystal from '../../assets/navigation-icons/crystal.png';
import './navigation.scss';
import ServerList from './server-list/server-list';
import SearchList from './search-list/search-list';
import { ServerContext } from '../../context/ServerContext';
import RecipeObject from '../../interfaces/recipe-interface';

export default function Navigation() {

    const { server } = useContext(ServerContext);
    const [searchList, setSearchList] = useState<RecipeObject[]>([]);
    const [showRecipeList, setShowRecipeList] = useState<boolean>(false);
    const [showServerList, setShowServerList] = useState<boolean>(false);

    useEffect(() => {

        window.addEventListener('click', detectClick)

        return () => {

            window.removeEventListener('click', detectClick);
        }
    }, []);


    useEffect(() => {
        if (searchList.length > 0) {
            setShowRecipeList(true);
        }
    }, [searchList])

    // The only situation we want the drop down to be visible is when the user clicks on the button.
    // So hide the menu on a click that isn't the drop down menu button.
    let detectClick = (event: any) => {
        if (event.target.id !== 'crystal-image') {
            setShowServerList(false);
        }
        if (event.target.className !== 'recipe-list-item') {
            setShowRecipeList(false);
        }
        if (event.target.id === 'search-bar') {
            setShowRecipeList(true);
        }
    }

    return (
        <nav id="navigation">
            <Link to="/" id="logo" />

            <ul id="nav-list">
                <li id="search-bar-container">
                    <SearchBar setList={setSearchList} />
                    {showRecipeList ? <SearchList list={searchList} /> : null}
                </li>
                <li id="server">
                    {server}
                </li>
                <li id="crystal" onClick={() => { setShowServerList(!showServerList) }} >
                    <img id="crystal-image" src={crystal} alt="crystal" />
                </li>
                {showServerList ? <ServerList /> : null}
            </ul>
        </nav>
    )
}