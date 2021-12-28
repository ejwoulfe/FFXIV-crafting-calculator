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

function RecipeRow(props: { data: RowProps }) {
    const [materialsArr, setMaterialsArr] = useState<Array<MaterialObject> | null>(null);
    const [materialsLoaded, setMaterialsLoaded] = useState<boolean>(false);
    const [crystalsLoaded, setCrystalsLoaded] = useState<boolean>(false);
    const [crystalsArr, setCrystalsArr] = useState<Array<CrystalObject> | null>(null);

    useEffect(() => {
        setMaterialsLoaded(false);
        setCrystalsLoaded(false);

        (async () => {

            try {
                const crystalFetch = await fetch(`http://localhost:5000/crystals/id/${props.data.recipe.recipe_id}`, { signal: props.data.abortController.signal })
                const crystals = await crystalFetch.json();
                setCrystalsArr(crystals);
                setCrystalsLoaded(true);

                const materialFetch = await fetch(`http://localhost:5000/materials/id/${props.data.recipe.recipe_id}`, { signal: props.data.abortController.signal })
                const materials = await materialFetch.json();
                setMaterialsArr(materials)
                setMaterialsLoaded(true);


            } catch (error: any) {
                console.log(error)
            }
        })();

        return () => {
            props.data.abortController.abort();
        }
    }, [props.data.recipe.recipe_id, props.data.abortController])

    useEffect(() => {
        console.log("Rendering")
    })


    const recipeImages = require.context('../../../assets/recipe-icons/', true);
    let filePath = recipeImages(`./${props.data.recipe.icon}`).default;
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
                <h2>{props.data.recipe.name}</h2>
                <span className="img-and-details">
                    <img src={filePath} alt={`${props.data.recipe.name} icon`} />
                    <span className="details">
                        <p>- Recipe Level: {props.data.recipe.level}</p>
                        {(props.data.recipe.item_level !== null && props.data.recipe.item_level !== "null")
                            ? <p>- Recipe Item Level: {props.data.recipe.item_level}</p>
                            : null}
                        {(props.data.recipe.type !== "null" && props.data.recipe.type !== null)
                            ? <p>- {props.data.recipe.type}</p>
                            : null}
                    </span>
                </span>
            </div>
            <div className="recipe-materials">
                {materialsArr !== null
                    ? createItemsList(materialsArr, "material")
                    : <div className="loading-spinner"></div>}
            </div>
            <div className="recipe-crystals">
                {crystalsArr !== null
                    ? createItemsList(crystalsArr, "crystal")
                    : <div className="loading-spinner"></div>}
            </div>
        </div>
    );
}

export default RecipeRow;