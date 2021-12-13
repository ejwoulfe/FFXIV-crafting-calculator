import { Link } from 'react-router-dom';
import alchemist from '../../assets/disciple-icons/alchemist.png';
import armorer from '../../assets/disciple-icons/armorer.png';
import blacksmith from '../../assets/disciple-icons/blacksmith.png';
import carpenter from '../../assets/disciple-icons/carpenter.png';
import culinarian from '../../assets/disciple-icons/culinarian.png';
import goldsmith from '../../assets/disciple-icons/goldsmith.png';
import leatherworker from '../../assets/disciple-icons/leatherworker.png';
import weaver from '../../assets/disciple-icons/weaver.png';
import './disciples.scss';

export default function Disciples() {


    return (
        <ul id="icons-container">
            <Link to="disciple/alchemist/recipes" className="disciples-li">
                <img className="disciples-icon" src={alchemist} alt="alchemist icon" />
                <p>Alchemist</p>
            </Link>
            <Link to="disciple/armorer/recipes" className="disciples-li">
                <img className="disciples-icon" src={armorer} alt="armorer icon" />
                <p>Armorer</p>
            </Link>
            <Link to="disciple/blacksmith/recipes" className="disciples-li">
                <img className="disciples-icon" src={blacksmith} alt="blacksmith icon" />
                <p>Blacksmith</p>
            </Link>
            <Link to="disciple/carpenter/recipes" className="disciples-li">
                <img className="disciples-icon" src={carpenter} alt="carpenter icon" />
                <p>Carpenter</p>
            </Link>
            <Link to="disciple/culinarian/recipes" className="disciples-li">
                <img className="disciples-icon" src={culinarian} alt="culinarian icon" />
                <p>Culinarian</p>
            </Link>
            <Link to="disciple/goldsmith/recipes" className="disciples-li">
                <img className="disciples-icon" src={goldsmith} alt="goldsmith icon" />
                <p>Goldsmith</p>
            </Link>
            <Link to="disciple/leatherworker/recipes" className="disciples-li">
                <img className="disciples-icon" src={leatherworker} alt="leatherworker icon" />
                <p>Leatherworker</p>
            </Link>
            <Link to="disciple/weaver/recipes" className="disciples-li">
                <img className="disciples-icon" src={weaver} alt="weaver icon" />
                <p>Weaver</p>
            </Link>
        </ul>

    )
}