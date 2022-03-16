import hqIcon from '../../../../assets/ui-icons/hq.png';
import getRetainerCityIcon from '../../../../helpers/getRetainerCityIcon';
import './market-board-prices-list.scss';
import MarketObject from '../../../../interfaces/market-object';

interface MarketBoardPricesListProps {
    filteredList: Array<MarketObject>,
    lastUpdateTime: number,
    highQualityChecked: boolean,
    purchaseIndexes: Array<number>
}


function MarketBoardPricesList(props: { data: MarketBoardPricesListProps }) {


    function convertTimeToLocal(time: number) {
        const date = new Date(time);
        const dateToString = 'Last Time Listing was updated: ' + date.toLocaleString();
        return <h5 className="last-updated">{dateToString}</h5>
    }


    function createMarketBoardListings(list: Array<MarketObject>) {


        return (
            <table className="listing-table">
                <thead >
                    <tr className="table-head-row">
                        <th>HQ</th>
                        <th>City</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((marketItem: MarketObject, index: number) => {
                        if (props.data.purchaseIndexes.includes(index)) {
                            return <tr className="table-data-row-chosen" key={'pricing-number-' + index}>
                                <td className="data-hq">
                                    {marketItem.hq === true ? <img src={hqIcon} alt="high quality" /> : null}
                                </td>
                                <td className="data-city">
                                    <span className="table-border">
                                        {getRetainerCityIcon(marketItem.retainerCity, index)}
                                    </span>
                                </td>
                                <td className="data-price">
                                    <span className="table-border">
                                        {marketItem.pricePerUnit.toLocaleString()}
                                    </span>
                                </td>
                                <td className="data-quantity">
                                    <span className="table-border">
                                        {marketItem.quantity}
                                    </span>
                                </td>
                                <td className="data-total">
                                    <span className="table-border">
                                        {marketItem.total.toLocaleString()}
                                    </span>
                                </td>
                            </tr>
                        } else {
                            return <tr className="table-data-row" key={'pricing-number-' + index}>
                                <td className="data-hq">
                                    {marketItem.hq === true ? <img src={hqIcon} alt="high quality" /> : null}
                                </td>
                                <td className="data-city">
                                    <span className="table-border">
                                        {getRetainerCityIcon(marketItem.retainerCity, index)}
                                    </span>
                                </td>
                                <td className="data-price">
                                    <span className="table-border">
                                        {marketItem.pricePerUnit.toLocaleString()}
                                    </span>
                                </td>
                                <td className="data-quantity">
                                    <span className="table-border">
                                        {marketItem.quantity}
                                    </span>
                                </td>
                                <td className="data-total">
                                    <span className="table-border">
                                        {marketItem.total.toLocaleString()}
                                    </span>
                                </td>
                            </tr>
                        }
                    })}
                </tbody>
            </table>
        )

    }



    return (
        <div className="prices-container">
            <div className="last-updated-container">
                {props.data.lastUpdateTime !== undefined ? convertTimeToLocal(props.data.lastUpdateTime) : null}
            </div>
            {props.data.filteredList.length > 0 ? createMarketBoardListings(props.data.filteredList) : <h1 className="no-listings">No Listings Found At This Time</h1>}

        </div>
    );
}

export default MarketBoardPricesList;