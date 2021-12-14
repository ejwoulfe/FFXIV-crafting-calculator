import { useEffect, useState } from 'react';
import RecipeObject from '../../../interfaces/recipe-interface';
import MaterialObject from '../../../interfaces/material-interface';
import CrystalObject from '../../../interfaces/crystal-interface';
import './recipe-row.scss';

interface RowProps {
    currentRecipe: RecipeObject
}

function RecipeRow(props: RowProps) {

    const [materialsArr, setMaterialsArr] = useState<Array<MaterialObject> | null>(null);
    const [crystalsArr, setCrystalsArr] = useState<Array<CrystalObject> | null>(null);

    let recipe = props.currentRecipe;

    async function fetchItemData(recipeID: number, itemType: string) {

        try {

            let itemsFetchQuery = await fetch(`http://localhost:5000/${itemType}/id/` + recipeID);
            let items = await itemsFetchQuery.json();
            return items;

        } catch (error: any) {

            throw new Error(error);

        }
    }

    useEffect(() => {
        fetchItemData(recipe.recipe_id, "materials").then((materials) => {
            setMaterialsArr(materials);
        });
        fetchItemData(recipe.recipe_id, "crystals").then((crystals) => {
            setCrystalsArr(crystals);
        });
    }, [recipe.recipe_id])


    // disciple_id: 3
    // icon: "blacksmith/colibri-pink-dye.png"
    // item_level: null
    // level: 30
    // link: "https://na.finalfantasyxiv.com/lodestone/playguide/db/recipe/77b517e589e/"
    // name: "Colibri Pink Dye"
    // recipe_id: 1217
    // total_crafted: 1
    // type: "null"


    const recipeImages = require.context('../../../assets/recipe-icons/', true);
    let filePath = recipeImages(`./${recipe.icon}`).default;
    const materialImages = require.context('../../../assets/material-icons/', true);
    const crystalImages = require.context('../../../assets/crystal-icons/', true);



    function createItemsList(itemArray: Array<MaterialObject> | Array<CrystalObject>, itemType: string) {

        return itemArray.map((item: MaterialObject | CrystalObject, index: number) => {

            let filePath = null;

            if (itemType === "material") {
                filePath = materialImages(`./${item.icon}`).default;
            } else {
                filePath = crystalImages(`./${item.icon}`).default;
            }

            return (
                <li key={'item-' + index}>
                    <img className="item-image" src={filePath} alt={`${item.name} + icon`} />
                    <p className="item-quantity"><span className="x-marker">x</span>{item.quantity}</p>
                    <p className="item-name">{item.name}</p>
                </li>
            )
        })
    }

    return (
        <div className="recipe-row">
            <div className="recipe-details">
                <h2>{recipe.name}</h2>
                <span className="img-and-details">
                    <img src={filePath} alt={`${recipe.name} icon`} />
                    <span className="details">
                        <p>- Recipe Level: {recipe.level}</p>
                        {(recipe.item_level !== null && recipe.item_level !== "null")
                            ? <p>- Recipe Item Level: {recipe.item_level}</p>
                            : null}
                        {(recipe.type !== "null" && recipe.type !== null)
                            ? <p>- {recipe.type}</p>
                            : null}
                    </span>
                </span>
            </div>
            <div className="recipe-materials">
                {materialsArr !== null ? createItemsList(materialsArr, "material") : <div className="loading-spinner"></div>}
            </div>
            <div className="recipe-crystals">
                {crystalsArr !== null ? createItemsList(crystalsArr, "crystal") : <div className="loading-spinner"></div>}
            </div>
        </div>
    );
}

export default RecipeRow;