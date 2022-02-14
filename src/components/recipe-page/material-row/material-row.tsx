import MarketBoardPricesList from './market-board-prices-list/market-board-prices-list';
import { useEffect, useState, useContext } from 'react';
import MarketObject from '../../../interfaces/market-object';
import { ServerContext } from "../../../context/ServerContext";
import calculateCheapestOption from './material-calculations/calculateCheapestOption';
import MaterialCalculations from './material-calculations/material-calculations';

interface MaterialRowProps {
    name: string,
    icon: string,
    quantity: number
}
interface ItemObject {
    ID: number,
    Icon: string,
    Name: string,
    Url: string,
    UrlType: string,
    additionalProperties: { [prop: string]: string };
}
interface FetchObject {
    Pagination: object,
    Results: Array<ItemObject>,
    SpeedMS: number
}

function MaterialRow(props: { material: MaterialRowProps }) {

    // State
    const [showPrices, setShowPrices] = useState<boolean>(false);
    const [highQualityChecked, setHighQualityChecked] = useState<boolean>(false);
    const [abortController, setAbortController] = useState<AbortController>(new AbortController());
    const [pricesList, setPricesList] = useState<Array<MarketObject>>([]);
    const [marketDataLoaded, setMarketDataLoaded] = useState<boolean>(false);
    const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);

    // Context
    const { server } = useContext(ServerContext);



    // Variables
    const materialImagesPath = require.context('../../../assets/material-icons/', true);
    const materialName = props.material.name;
    const quantityRequired = props.material.quantity;



    useEffect(() => {

        setMarketDataLoaded(false);


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
                    const pricingData = await pricesFetch.json();
                    setPricesList(pricingData.listings)
                    setLastUpdateTime(pricingData.lastUploadTime)
                    setMarketDataLoaded(true);

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

    useEffect(() => {
        if (pricesList.length > 0) {
            calculateCheapestOption(highQualityChecked, pricesList);
        }
    }, [pricesList, highQualityChecked])

    return (
        <>
            <div className="material-row">
                <span className="material-details">
                    <span className="hq-checkbox-container">
                        <label>HQ?</label>
                        <input type="checkbox" className="hq-checkbox" name="hq checkbox" value="hq" onClick={() => setHighQualityChecked(!highQualityChecked)} />
                    </span>
                    <img src={materialImagesPath(`./${props.material.icon}`).default} alt={props.material.name} />
                    <h3>
                        <span className="x-marker">
                            x
                        </span>
                        {props.material.quantity}
                    </h3>
                    <h3 className="material-name">{props.material.name}</h3>
                </span>
                {marketDataLoaded === true ? <MaterialCalculations data={{ showPrices, setShowPrices }} /> : null}

            </div>
            {marketDataLoaded === true && showPrices === true ? <MarketBoardPricesList data={{ pricesList, lastUpdateTime, highQualityChecked }} /> : null}
        </>)
}

export default MaterialRow;