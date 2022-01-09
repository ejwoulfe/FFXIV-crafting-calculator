
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './search-bar/search-bar';
import crystal from '../../assets/navigation-icons/crystal.png';
import './navigation.scss';
import ServerList from './server-list/server-list';

import { ServerContext } from '../../context/ServerContext';


export default function Navigation() {

    const { server } = useContext(ServerContext);
    const [showServerList, setShowServerList] = useState<boolean>(false);



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
                {showServerList ? <ServerList setShowServerList={setShowServerList} /> : null}
            </div>
        </nav>
    )
}