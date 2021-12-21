import { useEffect, useState } from 'react';
import RecipeObject from '../../../interfaces/recipe-interface';
import MaterialObject from '../../../interfaces/material-interface';
import CrystalObject from '../../../interfaces/crystal-interface';
import './recipe-row.scss';

interface RowProps {
    recipe: RecipeObject,
    index: number,
    listLength: number,
    abortController: AbortController
}

function RecipeRow(props: { currentRecipe: RowProps }) {
    const [materialsArr, setMaterialsArr] = useState<Array<MaterialObject> | null>(null);
    const [crystalsArr, setCrystalsArr] = useState<Array<CrystalObject> | null>(null);

    let recipe = props.currentRecipe.recipe;


    useEffect(() => {
        (async () => {

            try {
                const respone = await fetch(`http://localhost:5000/crystals/id/${recipe.recipe_id}`, { signal: props.currentRecipe.abortController.signal })
                const crystals = await respone.json();
                setCrystalsArr(crystals)

            } catch (error: any) {
                if (error.name === 'AbortError') {
                    console.log('Request aborted.')
                } else {
                    console.log(error)
                }
            }
        })();

        return () => {
            props.currentRecipe.abortController.abort();
        }
    }, [recipe.recipe_id, props.currentRecipe.abortController])

    useEffect(() => {
        (async () => {

            try {
                const respone = await fetch(`http://localhost:5000/materials/id/${recipe.recipe_id}`, { signal: props.currentRecipe.abortController.signal })
                const materials = await respone.json();
                setMaterialsArr(materials)

            } catch (error: any) {
                if (error.name === 'AbortError') {
                    console.log('Request aborted.')
                } else {
                    console.log(error)
                }
            }
        })();

        return () => {
            props.currentRecipe.abortController.abort();
        }

    }, [recipe.recipe_id, props.currentRecipe.abortController])


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