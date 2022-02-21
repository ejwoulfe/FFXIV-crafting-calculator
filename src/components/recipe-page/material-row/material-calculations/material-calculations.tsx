
import getRetainerCityIcon from '../../getRetainerCityIcon';
import highQuality from '../../../../assets/ui-icons/hq.png';
import calculateCheapestOption from './calculateCheapestOption';
import MarketObject from '../../../../interfaces/market-object';
import { useEffect, useState } from 'react';

interface MaterialCalculationsProps {
    highQualityChecked: boolean,
    pricesList: Array<MarketObject>,
    quantityRequired: number,
    setPurchaseIndexes: React.Dispatch<React.SetStateAction<Array<number>>>

}
function MaterialCalculations(props: { data: MaterialCalculationsProps }) {

    const [HQ, setHQ] = useState<boolean>(false);
    const [city, setCity] = useState<number>();
    const [avgPricePer, setAvgPricePer] = useState<number>();
    const [quantity, setQuantity] = useState<number>();
    const [totalPrice, setTotalPrice] = useState<number>();
    const [cheapestOptionsArray, setCheapestOptionsArray] = useState<Array<MarketObject>>([]);

    useEffect(() => {

        setCheapestOptionsArray(calculateCheapestOption(props.data.highQualityChecked, props.data.pricesList, props.data.quantityRequired));

    }, [props.data.highQualityChecked, props.data.pricesList, props.data.quantityRequired]);

    useEffect(() => {
        if (cheapestOptionsArray.length > 0) {
            let total = 0;
            for (let i = 0; i < cheapestOptionsArray.length; i++) {
                total += cheapestOptionsArray[i].total;

            }
            setTotalPrice(total);
        }
    }, [cheapestOptionsArray])



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
                <h4 className="calculation-title">Avg Price Per</h4>
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