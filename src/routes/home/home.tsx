import { Link } from 'react-router-dom';
import alchemist from '../../assets/disciple-icons/alchemist.png';
import armorer from '../../assets/disciple-icons/armorer.png';
import blacksmith from '../../assets/disciple-icons/blacksmith.png';
import carpenter from '../../assets/disciple-icons/carpenter.png';
import culinarian from '../../assets/disciple-icons/culinarian.png';
import goldsmith from '../../assets/disciple-icons/goldsmith.png';
import leatherworker from '../../assets/disciple-icons/leatherworker.png';
import weaver from '../../assets/disciple-icons/weaver.png';
import './home.scss';

export default function Home() {

    return (
        <div id="home-page">

            <h1 id="title">FFXIV Crafting Calculator</h1>

            <h2 id="disciples-title">Choose a disciple of the hand</h2>
            <div id="disciples-container">
                <ul id="icons-container">
                    <Link to="disciple/1/recipes" className="disciples-li" state={{ name: "alchemist", src: alchemist }}>
                        <img className="disciples-icon" src={alchemist} alt="alchemist icon" />
                        <p>Alchemist</p>
                    </Link>
                    <Link to="disciple/2/recipes" className="disciples-li" state={{ name: "armorer", src: armorer }}>
                        <img className="disciples-icon" src={armorer} alt="armorer icon" />
                        <p>Armorer</p>
                    </Link>
                    <Link to="disciple/3/recipes" className="disciples-li" state={{ name: "blacksmith", src: blacksmith }}>
                        <img className="disciples-icon" src={blacksmith} alt="blacksmith icon" />
                        <p>Blacksmith</p>
                    </Link>
                    <Link to="disciple/4/recipes" className="disciples-li" state={{ name: "carpenter", src: carpenter }}>
                        <img className="disciples-icon" src={carpenter} alt="carpenter icon" />
                        <p>Carpenter</p>
                    </Link>
                    <Link to="disciple/5/recipes" className="disciples-li" state={{ name: "culinarian", src: culinarian }}>
                        <img className="disciples-icon" src={culinarian} alt="culinarian icon" />
                        <p>Culinarian</p>
                    </Link>
                    <Link to="disciple/6/recipes" className="disciples-li" state={{ name: "goldsmith", src: goldsmith }}>
                        <img className="disciples-icon" src={goldsmith} alt="goldsmith icon" />
                        <p>Goldsmith</p>
                    </Link>
                    <Link to="disciple/7/recipes" className="disciples-li" state={{ name: "leatherworker", src: leatherworker }}>
                        <img className="disciples-icon" src={leatherworker} alt="leatherworker icon" />
                        <p>Leatherworker</p>
                    </Link>
                    <Link to="disciple/8/recipes" className="disciples-li" state={{ name: "weaver", src: weaver }}>
                        <img className="disciples-icon" src={weaver} alt="weaver icon" />
                        <p>Weaver</p>
                    </Link>
                </ul>
            </div>
        </div>
    )
}