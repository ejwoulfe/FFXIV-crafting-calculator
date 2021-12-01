import { useContext, useEffect, useState } from "react"
import './server-list.scss';
import { ServerContext } from '../../../context/ServerContext';


export default function ServerList() {

    const [naServerList, setNAServerList] = useState<object>({});
    const { setServer } = useContext(ServerContext);

    useEffect(() => {

        setNAServerList({
            Aether: ["Adamantoise", "Cactuar", "Faerie", "Gilgamesh", "Jenova", "Midgardsormr", "Sargatanas", "Siren"],
            Primal: ["Behemoth", "Excalibur", "Exodus", "Famfrit", "Hyperion", "Lamia", "Leviathan", "Ultros"],
            Crystal: ["Balmung", "Brynhildr", "Coeurl", "Diabolos", "Goblin", "Malboro", "Mateus", "Zalera"]
        })
    }, [])


    function createListOfServers(servers: object) {
        let numberOfDataCenters = Object.entries(servers).length;
        let unorderedListsArray = [];

        // Loop through the number of datacenters in our object, creating a unordered list for each datacenter
        // first li element will be the data center name and the rest are just servers.
        for (let i = 0; i < numberOfDataCenters; i++) {

            unorderedListsArray.push((

                <ul className="data-center-list" key={"list-" + i}>

                    <li className="data-center" key={"data-center-" + i}>{Object.entries(servers)[i][0]}</li>

                    {Object.entries(servers)[i][1].map((value: string, index: number) => {
                        return <li className="server" key={"server-" + index}>{value}</li>
                    })}

                </ul>
            ))
        }

        return unorderedListsArray;
    }


    function changeServer(event: any) {

        if (event.target.className === 'server') {
            setServer(event.target.innerText)
        }

    }

    return (
        <div id="server-list" onClick={(event) => { changeServer(event) }}>
            {createListOfServers(naServerList).map((value) => {
                return value;
            })}
        </div>

    )
}