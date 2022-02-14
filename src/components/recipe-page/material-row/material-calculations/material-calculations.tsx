import arrowDown from '../../../../assets/ui-icons/arrow-down.svg';
import getRetainerCityIcon from '../../getRetainerCityIcon';
import highQuality from '../../../../assets/ui-icons/hq.png';

interface MaterialCalculationsProps {
    showPrices: boolean,
    setShowPrices: React.Dispatch<React.SetStateAction<boolean>>
}
function MaterialCalculations(props: { data: MaterialCalculationsProps }) {
    return (
        <div className="material-calculations">
            <span className="hq">
                <h4 className="calculation-title">HQ</h4>
                <span className="calculation-value">
                    <img className="hq-img" src={highQuality} alt="high quality item" />
                </span>
            </span>
            <span className="city">
                <h4 className="calculation-title">City</h4>
                <span className="calculation-value">
                    {getRetainerCityIcon(1)}
                </span>
            </span>

            <span className="price-per">
                <h4 className="calculation-title">Price Per</h4>
                <span className="calculation-value">
                    <h4>0</h4>
                </span>
            </span>
            <span className="quantity">
                <h4 className="calculation-title">QTY</h4>
                <span className="calculation-value">
                    <h4>0</h4>
                </span>
            </span>
            <span className="total">
                <h4 className="calculation-title">TOTAL</h4>
                <span className="calculation-value">
                    <h4>0</h4>
                </span>
            </span>
            <span className="arrow">
                <img className="arrow-svg" src={arrowDown} alt="expand down arrow" onClick={() => props.data.setShowPrices(!props.data.showPrices)} />
            </span>
        </div>
    );
}

export default MaterialCalculations;