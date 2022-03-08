import MarketBoardPricesList from './market-board-prices-list/market-board-prices-list';
import { useEffect, useState, useContext } from 'react';
import MarketObject from '../../../interfaces/market-object';
import { ServerContext } from "../../../context/ServerContext";
import arrowDown from '../../../assets/ui-icons/arrow-down.svg';
import MaterialCalculations from './material-calculations/material-calculations';
import './material-row.scss';

interface MaterialRowProps {
    material: {
        name: string,
        icon: string,
        quantity: number
    },
    index: number
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

function MaterialRow(props: { data: MaterialRowProps }) {

    // State
    const [showPrices, setShowPrices] = useState<boolean>(false);
    const [highQualityChecked, setHighQualityChecked] = useState<boolean>(false);
    const [abortController, setAbortController] = useState<AbortController>(new AbortController());
    const [pricesList, setPricesList] = useState<Array<MarketObject>>([]);
    const [filteredList, setFilteredList] = useState<Array<MarketObject>>([]);
    const [marketDataLoaded, setMarketDataLoaded] = useState<boolean>(false);
    const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);
    const [purchaseIndexes, setPurchaseIndexes] = useState<Array<number>>([]);

    // Context
    const { server } = useContext(ServerContext);



    // Variables
    const materialImagesPath = require.context('../../../assets/material-icons/', true);
    const { name, icon } = props.data.material;
    const index = props.data.index;
    const quantityRequired = props.data.material.quantity;




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

                    const fetchMaterialId = await fetch(`https://xivapi.com/search?string_algo=match&string=${name}`, { signal: abortController.signal })
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
    }, [name, abortController, server]);

    useEffect(() => {
        if (highQualityChecked === true) {
            setFilteredList(pricesList.filter((marketItem: MarketObject) => marketItem.hq === true));
        } else {
            setFilteredList(pricesList)
        }
    }, [highQualityChecked, pricesList]);




    function getMaterialID(fetchObject: FetchObject) {

        return fetchObject.Results.map((item) => {

            if (item.UrlType === "Item") {
                return item.ID
            } else {
                return null;
            }
        })
    }

    return (
        <>
            <div className="material-row">
                <span className="material-details">
                    <span className="hq-checkbox-container">
                        <label>HQ?</label>
                        <input type="checkbox" className="hq-checkbox" name="hq checkbox" value="hq" onClick={() => setHighQualityChecked(!highQualityChecked)} />
                    </span>
                    <img src={materialImagesPath(`./${icon}`).default} alt={name} />
                    <h3>
                        <span className="x-marker">
                            x
                        </span>
                        {quantityRequired}
                    </h3>
                    <h3 className="material-name">{name}</h3>
                </span>
                <div className="material-calculations">
                    {marketDataLoaded === true ?
                        <>
                            <MaterialCalculations data={{ highQualityChecked, setHighQualityChecked, filteredList, quantityRequired, setPurchaseIndexes, index }} />
                            <span className="arrow">
                                <img className="arrow-svg" src={arrowDown} alt="expand down arrow" onClick={() => setShowPrices(!showPrices)} />
                            </span>
                        </>
                        : <div className="loading-spinner"></div>}

                </div>

            </div>
            {marketDataLoaded === true && showPrices === true ? <MarketBoardPricesList data={{ filteredList, lastUpdateTime, highQualityChecked, purchaseIndexes }} /> : null}
        </>)
}

export default MaterialRow;