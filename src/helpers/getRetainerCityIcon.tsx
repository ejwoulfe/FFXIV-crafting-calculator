import crystarium from '../assets/city-icons/crystarium.png';
import gridania from '../assets/city-icons/gridania.png';
import ishgard from '../assets/city-icons/ishgard.png';
import kugane from '../assets/city-icons/kugane.png';
import oldSharlayan from '../assets/city-icons/old-sharlayan.png';
import ulDah from "../assets/city-icons/ul'dah.png";
import limsaLominsa from "../assets/city-icons/limsa-lominsa.png";

export default function getRetainerCityIcon(cityId: number, index: number) {
    switch (cityId) {
        case 1:
            return <img key={"city-" + index} src={limsaLominsa} alt="limsa lominsa" />;
        case 2:
            return <img key={"city-" + index} src={gridania} alt="gridania" />;
        case 3:
            return <img key={"city-" + index} src={ulDah} alt="ul'dah" />;
        case 4:
            return <img key={"city-" + index} src={ishgard} alt="ishgard" />;
        case 7:
            return <img key={"city-" + index} src={kugane} alt="kugane" />;
        case 10:
            return <img key={"city-" + index} src={crystarium} alt="crystarium" />;
        case 12:
            return <img key={"city-" + index} src={oldSharlayan} alt="Old Sharlayan" />;
        default:
            return cityId.toString();
    }

}