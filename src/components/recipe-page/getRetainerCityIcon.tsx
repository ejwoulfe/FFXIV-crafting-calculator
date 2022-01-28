import crystarium from '../../assets/city-icons/crystarium.png';
import gridania from '../../assets/city-icons/gridania.png';
import ishgard from '../../assets/city-icons/ishgard.png';
import kugane from '../../assets/city-icons/kugane.png';
import oldSharlayan from '../../assets/city-icons/old-sharlayan.png';
import ulDah from "../../assets/city-icons/ul'dah.png";
import limsaLominsa from "../../assets/city-icons/limsa-lominsa.png";

export default function getRetainerCityIcon(cityId: number) {
    switch (cityId) {
        case 1:
            return <img src={limsaLominsa} alt="limsa lominsa" />;
        case 2:
            return <img src={gridania} alt="gridania" />;
        case 3:
            return <img src={ulDah} alt="ul'dah" />;
        case 4:
            return <img src={ishgard} alt="ishgard" />;
        case 7:
            return <img src={kugane} alt="kugane" />;
        case 10:
            return <img src={crystarium} alt="crystarium" />;
        case 12:
            return <img src={oldSharlayan} alt="Old Sharlayan" />;
        default:
            return cityId.toString();
    }

}