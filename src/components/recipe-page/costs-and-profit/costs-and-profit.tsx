import './costs-and-profit.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import MarketObject from '../../../interfaces/market-object';
import convertNumberToString from '../../../helpers/convertNumberToString';


interface CostsAndProfitInterface {
    recipeName: string,
    recipeMarketListings: Array<MarketObject>
}

export default function CostsAndProfit(props: { data: CostsAndProfitInterface }) {

    const totalCosts = useSelector((state: RootState) => state.costData.totalCost);
    const totalNumber = totalCosts.reduce((prev, current) => {
        return prev + current;
    }, 0)
    const { recipeName, recipeMarketListings } = props.data;


    function calculateTotalProfits(salePrice: number, costsForMaterials: number) {
        return salePrice - costsForMaterials;
    }

    return (
        <div id="costs-and-profits-container">
            <div id="current-sale-price-container">
                <span className="profits-title">
                    <h2>Cheapest Sale Price For {recipeName}</h2>
                </span>
                <span className="profits-value">
                    {recipeMarketListings.length > 0 ? <h1>{convertNumberToString(recipeMarketListings[0].pricePerUnit)}</h1> : <h2>No Items Currently on Market</h2>}

                </span>
            </div>
            <div id="total-costs-container">
                <span className="profits-title">
                    <h2>Total Costs for Materials</h2>
                </span>
                <span className="profits-value">
                    <h1>
                        {totalCosts.length > 0 ?
                            convertNumberToString(totalNumber) : null}</h1>
                </span>
            </div>
            <div id="total-profits-container">
                <span className="profits-title">
                    <h2>Total Profits</h2>
                </span>
                <span className="profits-value">
                    {recipeMarketListings.length > 0 ? <h1>{convertNumberToString(calculateTotalProfits(recipeMarketListings[0].pricePerUnit, totalNumber))}</h1> : <h1>N/A</h1>}
                </span>
            </div>


        </div>
    )
}