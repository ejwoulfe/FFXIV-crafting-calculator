import { useState } from "react";
import hqIcon from '../../../../assets/ui-icons/hq.png';
import getRetainerCityIcon from '../../getRetainerCityIcon';
import './market-board-prices-list.scss';
import MarketObject from '../../../../interfaces/market-object';

interface MarketBoardPricesListProps {
    pricesList: Array<MarketObject>,
    lastUpdateTime: number,
    highQualityChecked: boolean
}


function MarketBoardPricesList(props: { data: MarketBoardPricesListProps }) {


    function convertTimeToLocal(time: number) {
        const date = new Date(time);
        const dateToString = 'Last Time Listing was updated: ' + date.toLocaleString();
        return <h5 className="last-updated">{dateToString}</h5>
    }


    function createMarketBoardListings(list: Array<MarketObject>, hqRequired: boolean) {
        let pricesList = [];
        if (hqRequired === true) {
            pricesList = list.filter((marketItem: MarketObject) => marketItem.hq === true);
        }
        else {
            pricesList = list;
        }


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
                    {pricesList.map((marketItem: MarketObject, index: number) => {
                        return <tr className="table-data-row" key={'pricing-number-' + index}>
                            <td className="data-hq">
                                {marketItem.hq === true ? <img src={hqIcon} alt="high quality" /> : null}
                            </td>
                            <td className="data-city">
                                <span className="table-border">
                                    {getRetainerCityIcon(marketItem.retainerCity)}
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
            {createMarketBoardListings(props.data.pricesList, props.data.highQualityChecked)}

        </div>
    );
}

export default MarketBoardPricesList;