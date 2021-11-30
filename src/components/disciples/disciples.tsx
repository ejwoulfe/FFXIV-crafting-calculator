import alchemist from '../../assets/disciples-icons/alchemist.png';
import armorer from '../../assets/disciples-icons/armorer.png';
import blacksmith from '../../assets/disciples-icons/blacksmith.png';
import carpenter from '../../assets/disciples-icons/carpenter.png';
import culinarian from '../../assets/disciples-icons/culinarian.png';
import goldsmith from '../../assets/disciples-icons/goldsmith.png';
import leatherworker from '../../assets/disciples-icons/leatherworker.png';
import weaver from '../../assets/disciples-icons/weaver.png';
import './disciples.scss';

export default function Disciples() {

    return (
        <ul id="icons-container">
            <li className="disciples-li">
                <img className="disciples-icon" src={alchemist} alt="alchemist icon" />
                <p>Alchemist</p>
            </li>
            <li className="disciples-li">
                <img className="disciples-icon" src={armorer} alt="armorer icon" />
                <p>Armorer</p>
            </li>
            <li className="disciples-li">
                <img className="disciples-icon" src={blacksmith} alt="blacksmith icon" />
                <p>Blacksmith</p>
            </li>
            <li className="disciples-li">
                <img className="disciples-icon" src={carpenter} alt="carpenter icon" />
                <p>Carpenter</p>
            </li>
            <li className="disciples-li">
                <img className="disciples-icon" src={culinarian} alt="culinarian icon" />
                <p>Culinarian</p>
            </li>
            <li className="disciples-li">
                <img className="disciples-icon" src={goldsmith} alt="goldsmith icon" />
                <p>Goldsmith</p>
            </li>
            <li className="disciples-li">
                <img className="disciples-icon" src={leatherworker} alt="leatherworker icon" />
                <p>Leatherworker</p>
            </li>
            <li className="disciples-li">
                <img className="disciples-icon" src={weaver} alt="weaver icon" />
                <p>Weaver</p>
            </li>
        </ul>

    )
}