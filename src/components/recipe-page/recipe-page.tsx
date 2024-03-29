import RecipeObject from "../../interfaces/recipe-interface";
import websiteIcon from "../../assets/ui-icons/playguide.png";
import MaterialObject from "../../interfaces/material-interface";
import CrystalObject from "../../interfaces/crystal-interface";
import "./recipe-page.scss";
import MaterialRow from "./material-row/material-row";
import CostsAndProfit from "./costs-and-profit/costs-and-profit";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToTotalCost, reset } from "../../redux/reducers/cost-slice";
import MarketObject from "../../interfaces/market-object";
import { ServerContext } from "../../context/ServerContext";
import getMaterialID from "../../helpers/getMaterialId";

interface RecipePageProps {
  recipeObject: RecipeObject;
  recipeImage: string;
  materials: Array<MaterialObject>;
  crystals: Array<CrystalObject>;
}

function RecipePage(props: { data: RecipePageProps }) {
  // Redux
  const dispatch = useDispatch();

  // State
  const totalNumOfMaterials = props.data.materials.length;
  const [recipeMarketDataLoaded, setRecipeMarketDataLoaded] = useState<boolean>(false);
  const [recipeMarketListings, setRecipeMarketListings] = useState<Array<MarketObject>>([]);
  const [abortController] = useState<AbortController>(new AbortController());
  const recipeName = props.data.recipeObject.name;

  // Context
  const { server } = useContext(ServerContext);

  // Image path for crystals if I want to include them in my calculations. As of right now, don't think they are worth it.
  //const crystalImagesPath = require.context('../../assets/crystal-icons/', true);

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
          const fetchMaterialId = await fetch(`https://xivapi.com/search?string_algo=match&string=${recipeName}`, {
            signal: abortController.signal,
          });
          const fetchObject = await fetchMaterialId.json();
          const materialId = await getMaterialID(fetchObject);

          const pricesFetch = await fetch(`https://universalis.app/api/${server}/${materialId}`, {
            signal: abortController.signal,
          });
          const pricingData = await pricesFetch.json();
          setRecipeMarketListings(pricingData.listings);
          setRecipeMarketDataLoaded(true);
        } catch (error: any) {
          abortController.abort();
          return;
        }
      })();
    }

    return () => {
      abortController.abort();
    };
  }, [recipeName, abortController, server]);

  function createMaterialDivs(materials: Array<MaterialObject>) {
    return materials.map((material, index) => {
      return <MaterialRow data={{ material, index }} key={"material-row-" + index} />;
    });
  }

  useEffect(() => {
    dispatch(reset());
    for (let i = 0; i < totalNumOfMaterials; i++) {
      dispatch(addToTotalCost(0));
    }
  }, [dispatch, totalNumOfMaterials]);

  return (
    <div id="recipe-info">
      <div id="title-and-info-container">
        <h1 id="recipe-title">{props.data.recipeObject.name}</h1>
        <div id="recipe-craft-info">
          <img id="recipe-img" src={props.data.recipeImage} alt={`${props.data.recipeObject.name} recipe`} />
          <div id="recipe-details">
            <p>- Recipe Level: {props.data.recipeObject.level}</p>
            {props.data.recipeObject.item_level !== null && props.data.recipeObject.item_level !== "null" ? (
              <p>- Recipe Item Level: {props.data.recipeObject.item_level}</p>
            ) : null}
            {props.data.recipeObject.type !== "null" && props.data.recipeObject.type !== null ? (
              <p>- {props.data.recipeObject.type}</p>
            ) : null}
          </div>
          <div id="recipe-link">
            <img src={websiteIcon} alt="Eorzea database" />
            <a target="_blank" rel="noreferrer" href={props.data.recipeObject.link}>
              {" "}
              Eorzea Database Link
            </a>
          </div>
        </div>
      </div>
      {recipeMarketDataLoaded ? <CostsAndProfit data={{ recipeName, recipeMarketListings }} /> : null}

      <div id="materials-container">
        <h1 id="materials-title">Materials</h1>
        {createMaterialDivs(props.data.materials)}
      </div>
    </div>
  );
}

export default RecipePage;
