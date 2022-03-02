
import getRetainerCityIcon from '../../getRetainerCityIcon';
import calculateCheapestOption from './calculateCheapestOption';
import MarketObject from '../../../../interfaces/market-object';
import { useEffect, useState } from 'react';
import './material-calculations.scss';

interface MaterialCalculationsProps {
    highQualityChecked: boolean,
    filteredList: Array<MarketObject>,
    quantityRequired: number,
    setPurchaseIndexes: React.Dispatch<React.SetStateAction<Array<number>>>

}
function MaterialCalculations(props: { data: MaterialCalculationsProps }) {

    const [highQuality, setHighQuality] = useState<string>();
    const [cities, setCities] = useState<Array<number>>([]);
    const [avgPricePer, setAvgPricePer] = useState<number>();
    const [quantity, setQuantity] = useState<number>();
    const [totalPrice, setTotalPrice] = useState<number>();
    const [cheapestOptionsArray, setCheapestOptionsArray] = useState<Array<MarketObject>>([]);

    useEffect(() => {

        setCheapestOptionsArray(calculateCheapestOption(props.data.filteredList, props.data.quantityRequired));


    }, [props.data.highQualityChecked, props.data.filteredList, props.data.quantityRequired]);

    useEffect(() => {
        if (cheapestOptionsArray.length > 0) {
            let total = 0;
            let quantity = 0;
            let retainerCities = [];
            let amountOfHighQualities = 0;
            let indexes = [];

            for (let i = 0; i < cheapestOptionsArray.length; i++) {
                total += cheapestOptionsArray[i].total;
                quantity += cheapestOptionsArray[i].quantity;
                retainerCities.push(cheapestOptionsArray[i].retainerCity);
                indexes.push(cheapestOptionsArray[i].index);
                if (cheapestOptionsArray[i].hq === true) {
                    amountOfHighQualities += 1;
                }


            }
            setTotalPrice(total);
            setAvgPricePer(Math.round(total / quantity));
            setQuantity(quantity);
            setCities(retainerCities)
            props.data.setPurchaseIndexes(indexes)
            if (amountOfHighQualities === 0) {
                setHighQuality("No")
            } else if (amountOfHighQualities !== cheapestOptionsArray.length) {
                setHighQuality("Mix")
            } else if (amountOfHighQualities === cheapestOptionsArray.length) {
                setHighQuality("Yes")
            }
        }
    }, [cheapestOptionsArray])



    return (
        <>
            <span className="hq">
                <h4 className="calculation-title">HQ</h4>
                <span className="calculation-value">
                    <h4>{highQuality}</h4>
                </span>
            </span>
            <span className="city">
                <h4 className="calculation-title">City</h4>
                <span className="calculation-value">
                    <div id="city-icons">
                        {cities.map((cityNumber) => {
                            return getRetainerCityIcon(cityNumber)
                        })}
                    </div>
                </span>
            </span>

            <span className="price-per">
                <h4 className="calculation-title">Avg Price Per</h4>
                <span className="calculation-value">
                    <h4>{avgPricePer}</h4>
                </span>
            </span>
            <span className="quantity">
                <h4 className="calculation-title">QTY</h4>
                <span className="calculation-value">
                    <h4>{quantity}</h4>
                </span>
            </span>
            <span className="total">
                <h4 className="calculation-title">TOTAL</h4>
                <span className="calculation-value">
                    <h4>{totalPrice}</h4>
                </span>
            </span>

        </>
    );
}

export default MaterialCalculations;