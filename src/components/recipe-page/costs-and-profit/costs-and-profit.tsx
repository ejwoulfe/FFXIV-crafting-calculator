import './costs-and-profit.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';


export default function CostsAndProfit() {


    const totalCosts = useSelector((state: RootState) => state.costData.totalCost);


    return (
        <div id="costs-and-profits-container">
            <h1 id="total-costs">
                {totalCosts.length > 0 ?
                    totalCosts.reduce((prev, current) => {
                        return prev + current;
                    }, 0) : null}</h1>
        </div>
    )
}