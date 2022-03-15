
import getRetainerCityIcon from '../../../../helpers/getRetainerCityIcon';
import calculateCheapestOption from '../../../../helpers/calculateCheapestOption';
import MarketObject from '../../../../interfaces/market-object';
import { useEffect, useState } from 'react';
import './material-calculations.scss';
import { updateCost } from '../../../../redux/reducers/cost-slice';
import { useDispatch } from 'react-redux';
import convertNumberToString from '../../../../helpers/convertNumberToString';

interface MaterialCalculationsProps {
    highQualityChecked: boolean,
    filteredList: Array<MarketObject>,
    quantityRequired: number,
    setHighQualityChecked: React.Dispatch<React.SetStateAction<boolean>>,
    setPurchaseIndexes: React.Dispatch<React.SetStateAction<Array<number>>>,
    index: number
}

function MaterialCalculations(props: { data: MaterialCalculationsProps }) {


    //Redux
    const dispatch = useDispatch();


    // State
    const [highQuality, setHighQuality] = useState<string>();
    const [cities, setCities] = useState<Array<number>>([]);
    const [avgPricePer, setAvgPricePer] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [cheapestOptionsArray, setCheapestOptionsArray] = useState<Array<MarketObject>>([]);
    const [total, setTotal] = useState(0);


    // Props
    const { setPurchaseIndexes, highQualityChecked, setHighQualityChecked, filteredList, quantityRequired, index } = props.data;

    useEffect(() => {

        let optionsArr = calculateCheapestOption(filteredList, quantityRequired);
        if (optionsArr.length > 0) {
            setCheapestOptionsArray(optionsArr);

        } else {
            let checkbox = document.getElementsByClassName('hq-checkbox')[index] as HTMLInputElement;
            checkbox.checked = false;
            setHighQualityChecked(false);
            if (highQualityChecked === false) {
                window.alert("There are not enough listings available to meet the quantity requirement. Try again later.")
            }
        }

    }, [highQualityChecked, filteredList, quantityRequired, index, setHighQualityChecked]);



    useEffect(() => {

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
        setTotal(total);
        setAvgPricePer(Math.round(total / quantity));
        setQuantity(quantity);
        setCities(retainerCities)
        setPurchaseIndexes(indexes)
        if (amountOfHighQualities === 0) {
            setHighQuality("No")
        } else if (amountOfHighQualities !== cheapestOptionsArray.length) {
            setHighQuality("Mix")
        } else if (amountOfHighQualities === cheapestOptionsArray.length) {
            setHighQuality("Yes")
        }

    }, [cheapestOptionsArray, setPurchaseIndexes])

    useEffect(() => {

        if (total > 0) {

            dispatch(updateCost({ index, total }))
        }
    }, [total, dispatch, index])




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
                        {cities.map((cityNumber, index) => {
                            return getRetainerCityIcon(cityNumber, index)
                        })}
                    </div>
                </span>
            </span>
            <span className="price-per">
                <h4 className="calculation-title">Avg Price Per</h4>
                <span className="calculation-value">
                    <h4>{convertNumberToString(avgPricePer)}</h4>
                </span>
            </span>
            <span className="quantity">
                <h4 className="calculation-title">QTY</h4>
                <span className="calculation-value">
                    <h4>{convertNumberToString(quantity)}</h4>
                </span>
            </span>
            <span className="total">
                <h4 className="calculation-title">TOTAL</h4>
                <span className="calculation-value">
                    <h4>{convertNumberToString(total)}</h4>
                </span>
            </span>

        </>
    );
}

export default MaterialCalculations;