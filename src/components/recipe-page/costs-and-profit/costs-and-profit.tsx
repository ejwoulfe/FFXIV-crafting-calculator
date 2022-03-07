import './costs-and-profit.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';


export default function CostsAndProfit() {


    const totalCost = useSelector((state: RootState) => state.costData.totalCost);


    return (
        <div id="costs-and-profits-container">
            <h1 id="total-costs">{totalCost}</h1>
        </div>
    )
}