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
    const [isCanceled, setIsCanceled] = useState<boolean>(false);

    let recipe = props.currentRecipe;


    useEffect(() => {
        const firstController = new AbortController();
        const secondController = new AbortController();


        fetch(`http://localhost:5000/materials/id/${recipe.recipe_id}`, { signal: firstController.signal })
            .then((response) => response.json())
            .then((data) => {
                setMaterialsArr(data)
            })
            .catch((error) => console.log(error.message));


        fetch(`http://localhost:5000/crystals/id/${recipe.recipe_id}`, { signal: secondController.signal })
            .then((response) => response.json())
            .then((data) => {
                setCrystalsArr(data)
            })
            .catch((error) => console.log(error.message));

        return () => {
            firstController.abort()
            secondController.abort()
            setIsCanceled(true)
        };
    }, [recipe.recipe_id]);

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
                {materialsArr !== null && isCanceled === false ? createItemsList(materialsArr, "material") : <div className="loading-spinner"></div>}
            </div>
            <div className="recipe-crystals">
                {crystalsArr !== null && isCanceled === false ? createItemsList(crystalsArr, "crystal") : <div className="loading-spinner"></div>}
            </div>
        </div>
    );
}

export default RecipeRow;