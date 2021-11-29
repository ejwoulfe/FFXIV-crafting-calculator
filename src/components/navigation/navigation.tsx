
import { useState } from 'react';
import logo from '../../assets/logo/logo.png';
import SearchBar from './search-bar/search-bar';
import './navigation.scss';

export default function Navigation() {

    const [server, setServer] = useState<string>("Gilgamesh");

    return (
        <nav id="navigation">
            <img id="logo" src={logo} alt="logo" />
            <ul id="nav-list">
                <li><SearchBar /></li>
                <li>{server}</li>
            </ul>
        </nav>

    )

}