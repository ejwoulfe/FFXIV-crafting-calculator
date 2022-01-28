import { useContext, useEffect, useState } from "react";
import { ServerContext } from "../../../context/ServerContext";
import hqIcon from '../../../assets/ui-icons/hq.png';
import getRetainerCityIcon from '../getRetainerCityIcon';
import './market-board-prices-list.scss';
import MarketItemDetails from "../../../interfaces/market-item-interface";

interface MarketBoardPricesListProps {
    materialName: string,
    highQualityChecked: boolean,
    quantityRequired: number,
    setMarketItemDetails: React.Dispatch<React.SetStateAction<MarketItemDetails>>
}
interface FetchObject {
    Pagination: object,
    Results: Array<ItemObject>,
    SpeedMS: number
}
interface ItemObject {
    ID: number,
    Icon: string,
    Name: string,
    Url: string,
    UrlType: string,
    additionalProperties: { [prop: string]: string };
}

interface MarketObject {
    pricePerUnit: number,
    quantity: number,
    hq: boolean,
    retainerCity: number,
    total: number
}
function MarketBoardPricesList(props: { data: MarketBoardPricesListProps }) {

    const materialName = props.data.materialName;
    const [abortController, setAbortController] = useState<AbortController>(new AbortController());
    const [lastUpdateTime, setLastUpdateTime] = useState<number>();
    const [pricesList, setPricesList] = useState<Array<MarketObject>>([]);
    const [pricesLoaded, setPricesLoaded] = useState<boolean>(false);
    const { server } = useContext(ServerContext);

    useEffect(() => {

        setPricesLoaded(false);


        // Must be type item
        // https://xivapi.com/search?string_algo=match&string=${itemName}
        // Get item ID then retrieve Marketboard data.
        // https://universalis.app/api/${server}/${itemID}
        // Filter for hq only
        // https://universalis.app/api/${server}/${itemID}?hq=hq

        if (abortController.signal.aborted === false) {
            (async () => {
                try {

                    const fetchMaterialId = await fetch(`https://xivapi.com/search?string_algo=match&string=${materialName}`, { signal: abortController.signal })
                    const fetchObject = await fetchMaterialId.json();
                    const materialId = (await getMaterialID(fetchObject));

                    const pricesFetch = await fetch(`https://universalis.app/api/${server}/${materialId}`, { signal: abortController.signal })
                    const prices = await pricesFetch.json();
                    setPricesList(prices.listings)
                    setLastUpdateTime(prices.lastUploadTime)
                    setPricesLoaded(true);

                } catch (error: any) {
                    return;

                }
            })();

        }

        return () => {
            abortController.abort();

        }
    }, [materialName, abortController, server])

    function getMaterialID(fetchObject: FetchObject) {

        return fetchObject.Results.map((item) => {

            if (item.UrlType === "Item") {
                return item.ID
            } else {
                return null;
            }
        })
    }


    function createMarketBoardListings(list: Array<MarketObject>, hqRequired: boolean) {
        console.log(list)
        let pricesList = [];
        if (hqRequired === true) {
            pricesList = list.filter((marketItem: MarketObject, index: number) => marketItem.hq === true);
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

    function convertTimeToLocal(time: number) {
        const date = new Date(time);
        const dateToString = 'Last Time Listing was updated: ' + date.toLocaleString();
        return <h5 className="last-updated">{dateToString}</h5>
    }

    return (
        <div className="prices-container">
            <div className="last-updated-container">
                {lastUpdateTime !== undefined ? convertTimeToLocal(lastUpdateTime) : null}
            </div>
            {pricesLoaded === true ? createMarketBoardListings(pricesList, props.data.highQualityChecked) : <div className="loading-spinner"></div>}

        </div>
    );
}

export default MarketBoardPricesList;