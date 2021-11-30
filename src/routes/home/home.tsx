import Disciples from "../../components/disciples/disciples";
import './home.scss';

export default function Home() {

    return (
        <div id="home-page">

            <h1 id="title">FFXIV Crafting Calculator</h1>

            <h2 id="disciples-title">Choose a disciple of the hand</h2>
            <div id="disciples-container">
                <Disciples />
            </div>
        </div>
    )
}