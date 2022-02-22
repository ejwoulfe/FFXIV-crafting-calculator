
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './search-bar/search-bar';
import crystal from '../../assets/ui-icons/crystal.png';
import './navigation.scss';
import ServerList from './server-list/server-list';

import { ServerContext } from '../../context/ServerContext';


export default function Navigation() {

    const { server } = useContext(ServerContext);
    const [showServerList, setShowServerList] = useState<boolean>(false);



    return (
        <nav id="navigation">
            <div id="logo-container">
                <Link to="/" id="logo-link" >
                    <h1 id="logo-text">
                        FFXIV<span id="CC-text">CC</span>
                    </h1>
                </Link>
            </div>
            <div id="nav-items">
                <div id="search-bar-container">
                    <SearchBar />

                </div>
                <div id="server-container">
                    <span id="server">{server}</span>
                    <div id="crystal" onClick={() => { setShowServerList(!showServerList) }} >
                        <img id="crystal-image" src={crystal} alt="crystal" />
                    </div>
                </div>
                {showServerList ? <ServerList setShowServerList={setShowServerList} /> : null}
            </div>
        </nav>
    )
}