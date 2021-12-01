
import { useEffect, useState, useContext } from 'react';
import SearchBar from './search-bar/search-bar';
import crystal from '../../assets/navigation-icons/crystal.png';
import './navigation.scss';
import ServerList from './server-list/server-list';
import { ServerContext } from '../../context/ServerContext';

export default function Navigation() {

    const { server } = useContext(ServerContext);
    const [showList, setShowList] = useState<boolean>(false);

    useEffect(() => {

        window.addEventListener('click', detectClick)

        return () => {

            window.removeEventListener('click', detectClick);
        }
    }, []);

    // The only situation we want the drop down to be visible is when the user clicks on the button.
    // So hide the menu on a click that isn't the drop down menu button.
    let detectClick = (event: any) => {
        if (event.target.id !== 'crystal-image') {
            setShowList(false)
        }
    }

    return (
        <nav id="navigation">
            <div id="logo">
            </div>
            <ul id="nav-list">
                <li id="search-bar-container"><SearchBar /></li>
                <li id="server">{server}</li>
                <li id="crystal" onClick={() => { setShowList(!showList) }} ><img id="crystal-image" src={crystal} alt="crystal" /></li>
                {showList ? <ServerList /> : null}
            </ul>
        </nav>
    )
}