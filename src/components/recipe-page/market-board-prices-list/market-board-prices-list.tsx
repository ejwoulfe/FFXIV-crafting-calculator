import { useContext, useEffect, useState } from "react";
import { ServerContext } from "../../../context/ServerContext";

interface MarketBoardPricesListProps {
    name: string
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
function MarketBoardPricesList(material: MarketBoardPricesListProps) {

    const materialName = material.name;
    const [abortController, setAbortController] = useState<AbortController>(new AbortController());
    const [pricesLoaded, setPricesLoaded] = useState<boolean>(false);
    const { server } = useContext(ServerContext);

    useEffect(() => {

        setPricesLoaded(false);


        // Must be type item
        // https://xivapi.com/search?string_algo=match&string=${itemName}
        // Get item ID then retrieve Marketboard data.
        // https://universalis.app/api/${server}/${itemID}

        if (abortController.signal.aborted === false) {
            (async () => {
                try {

                    const fetchMaterialId = await fetch(`https://xivapi.com/search?string_algo=match&string=${materialName}`, { signal: abortController.signal })
                    const fetchObject = await fetchMaterialId.json();
                    const materialId = (await getMaterialID(fetchObject));

                    const pricesFetch = await fetch(`https://universalis.app/api/${server}/${materialId}`, { signal: abortController.signal })
                    const prices = await pricesFetch.json();
                    console.log(prices)
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

    return (
        <div className="prices-container">
        </div>
    );
}

export default MarketBoardPricesList;