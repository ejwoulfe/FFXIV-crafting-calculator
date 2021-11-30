
import { useState } from 'react';
import SearchBar from './search-bar/search-bar';
import crystal from '../../assets/navigation-icons/crystal.png';
import './navigation.scss';

export default function Navigation() {

    const [server, setServer] = useState<string>("Gilgamesh");

    return (
        <nav id="navigation">
            <div id="logo">
            </div>
            <ul id="nav-list">
                <li id="search-bar-container"><SearchBar /></li>
                <li id="server">{server}</li>
                <li id="crystal" ><img src={crystal} alt="crystal" /></li>
            </ul>
        </nav>

    )

}