
import getRetainerCityIcon from '../../getRetainerCityIcon';
import highQuality from '../../../../assets/ui-icons/hq.png';
import calculateCheapestOption from './calculateCheapestOption';
import MarketObject from '../../../../interfaces/market-object';
import { useEffect } from 'react';

interface MaterialCalculationsProps {
    highQualityChecked: boolean,
    pricesList: Array<MarketObject>,
    quantityRequired: number

}
function MaterialCalculations(props: { data: MaterialCalculationsProps }) {

    useEffect(() => {

        calculateCheapestOption(props.data.highQualityChecked, props.data.pricesList, props.data.quantityRequired);

    }, [props.data.highQualityChecked, props.data.pricesList, props.data.quantityRequired])

    return (
        <>
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

        </>
    );
}

export default MaterialCalculations;