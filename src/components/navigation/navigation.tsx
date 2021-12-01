
import { useEffect, useState } from 'react';
import SearchBar from './search-bar/search-bar';
import crystal from '../../assets/navigation-icons/crystal.png';
import './navigation.scss';
import ServerList from './server-list/server-list';

export default function Navigation() {

    const [server, setServer] = useState<string>("Gilgamesh");
    const [showList, setShowList] = useState<boolean>(false);

    return (
        <nav id="navigation">
            <div id="logo">
            </div>
            <ul id="nav-list">
                <li id="search-bar-container"><SearchBar /></li>
                <li id="server">{server}</li>
                <li id="crystal" onClick={() => { setShowList(!showList) }} ><img src={crystal} alt="crystal" /></li>
                {showList ? <ServerList /> : null}
            </ul>

        </nav>

    )

}