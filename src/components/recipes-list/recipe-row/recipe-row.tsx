import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeObject from '../../../interfaces/recipe-interface';
import MaterialObject from '../../../interfaces/material-interface';
import CrystalObject from '../../../interfaces/crystal-interface';
import './recipe-row.scss';

interface RowProps {
    recipe: RecipeObject,
    controller: AbortController
}

function RecipeRow(props: { data: RowProps }) {

    // State
    const [materialsLoaded, setMaterialsLoaded] = useState<boolean>(false);
    const [crystalsLoaded, setCrystalsLoaded] = useState<boolean>(false);
    const [materialsArr, setMaterialsArr] = useState<Array<MaterialObject> | null>(null);
    const [crystalsArr, setCrystalsArr] = useState<Array<CrystalObject> | null>(null);

    // Image Paths
    const recipeImagesPath = require.context('../../../assets/recipe-icons/', true);
    const materialImagesPath = require.context('../../../assets/material-icons/', true);
    const crystalImagesPath = require.context('../../../assets/crystal-icons/', true);
    let recipeImage = recipeImagesPath(`./${props.data.recipe.icon}`).default;

    useEffect(() => {
        setCrystalsLoaded(false);
        setMaterialsLoaded(false);


        if (props.data.controller.signal.aborted === false) {
            (async () => {
                try {

                    const crystalFetch = await fetch(`http://localhost:5000/crystals/id/${props.data.recipe.recipe_id}`, { signal: props.data.controller.signal })
                    const crystals = await crystalFetch.json();
                    setCrystalsArr(crystals);
                    setCrystalsLoaded(true);

                    const materialFetch = await fetch(`http://localhost:5000/materials/id/${props.data.recipe.recipe_id}`, { signal: props.data.controller.signal })
                    const materials = await materialFetch.json();
                    setMaterialsArr(materials)
                    setMaterialsLoaded(true);




                } catch (error: any) {
                    return;

                }
            })();

        }

        return () => {
            props.data.controller.abort();

        }
    }, [props.data.recipe.recipe_id, props.data.controller])




    function createItemsList(itemArray: Array<MaterialObject> | Array<CrystalObject>, itemType: string) {


        return itemArray.map((item: MaterialObject | CrystalObject, index: number) => {
            let src: string = "";

            if (itemType === "material") {
                src = materialImagesPath(`./${item.icon}`).default;


            } else {
                src = crystalImagesPath(`./${item.icon}`).default;
            }
            return (
                <span className="item-container" key={'item-' + index}>
                    <img className="item-img" src={src} alt={`${item.name} + icon`} />
                    <h6 className="item-quantity"><span className="x-marker">x</span>{item.quantity}</h6>
                    <h5 className="item-name">{item.name}</h5>
                </span>
            )
        })
    }



    return (
        <>
            {materialsLoaded === true && crystalsLoaded === true ?
                <Link to={`recipe/${props.data.recipe.recipe_id}`}
                    className="recipe-row"
                    state={{
                        recipe: props.data.recipe,
                        recipeImage: recipeImage,
                        materials: materialsArr,
                        crystals: crystalsArr
                    }}>
                    <div className="recipe-details">
                        <h2>{props.data.recipe.name}</h2>
                        <span className="img-and-details">
                            <span className="img-container">
                                <img src={recipeImage} alt={`${props.data.recipe.name} icon`} />
                            </span>
                            <span className="details">
                                <h5>- Recipe Level: {props.data.recipe.level}</h5>
                                {(props.data.recipe.item_level !== null && props.data.recipe.item_level !== "null")
                                    ? <h5>- Recipe Item Level: {props.data.recipe.item_level}</h5>
                                    : null}
                                {(props.data.recipe.type !== "null" && props.data.recipe.type !== null)
                                    ? <h5>- {props.data.recipe.type}</h5>
                                    : null}
                            </span>
                        </span>
                    </div>
                    <div className="recipe-materials">
                        {materialsLoaded === true && materialsArr !== null
                            ? createItemsList(materialsArr, "material")
                            : <div className="loading-container">
                                <div className="loading-spinner"></div>
                            </div>}
                    </div>
                    <div className="recipe-crystals">
                        {crystalsLoaded === true && crystalsArr !== null
                            ? createItemsList(crystalsArr, "crystal")
                            : <div className="loading-container">
                                <div className="loading-spinner"></div></div>}
                    </div>
                </Link>
                : <div className="row-loading-container">
                    <div className="row-loading-spinner"></div> <h4>Retrieving Item Data</h4></div>}
        </>
    );
}


export default RecipeRow;