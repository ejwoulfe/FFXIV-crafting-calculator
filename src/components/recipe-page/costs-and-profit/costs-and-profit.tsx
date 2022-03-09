import './costs-and-profit.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useContext, useEffect, useState } from 'react';
import getMaterialID from '../getMaterialId';
import { ServerContext } from '../../../context/ServerContext';
import MarketObject from '../../../interfaces/market-object';
import RecipeObject from '../../../interfaces/recipe-interface';

interface CostsAndProfitInterface {
    recipe: RecipeObject
}

export default function CostsAndProfit(data: CostsAndProfitInterface) {

    const totalCosts = useSelector((state: RootState) => state.costData.totalCost);
    const [recipeMarketDataLoaded, setRecipeMarketDataLoaded] = useState<boolean>(false);
    const [recipeMarketListings, setRecipeMarketListings] = useState<Array<MarketObject>>([]);
    const [abortController, setAbortController] = useState<AbortController>(new AbortController());
    const recipeName = data.recipe.name;

    // Context
    const { server } = useContext(ServerContext);


    useEffect(() => {

        setRecipeMarketDataLoaded(false);


        // Must be type item
        // https://xivapi.com/search?string_algo=match&string=${itemName}
        // Get item ID then retrieve Marketboard data.
        // https://universalis.app/api/${server}/${itemID}
        // Filter for hq only
        // https://universalis.app/api/${server}/${itemID}?hq=hq

        if (abortController.signal.aborted === false) {
            (async () => {
                try {

                    const fetchMaterialId = await fetch(`https://xivapi.com/search?string_algo=match&string=${recipeName
                        }`, { signal: abortController.signal })
                    const fetchObject = await fetchMaterialId.json();
                    const materialId = (await getMaterialID(fetchObject));

                    const pricesFetch = await fetch(`https://universalis.app/api/${server}/${materialId}`, { signal: abortController.signal })
                    const pricingData = await pricesFetch.json();
                    setRecipeMarketListings(pricingData.listings)
                    setRecipeMarketDataLoaded(true);

                } catch (error: any) {
                    return;

                }
            })();

        }

        return () => {
            abortController.abort();

        }
    }, [recipeName, abortController, server]);


    return (
        <div id="costs-and-profits-container">
            <div id="current-sale-price-container">
            </div>
            <div id="total-costs-container">
                <h1 id="total-costs">
                    {totalCosts.length > 0 ?
                        totalCosts.reduce((prev, current) => {
                            return prev + current;
                        }, 0).toLocaleString("en-US") : null}</h1>
            </div>
            <div id="total-profits-container">
            </div>


        </div>
    )
}