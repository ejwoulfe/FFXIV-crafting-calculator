import RecipeObject from "../../interfaces/recipe-interface";
import websiteIcon from '../../assets/ui-icons/playguide.png';
import MaterialObject from "../../interfaces/material-interface";
import CrystalObject from "../../interfaces/crystal-interface";
import './recipe-page.scss';
import MaterialRow from "./material-row/material-row";
import CostsAndProfit from "./costs-and-profit/costs-and-profit";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addToTotalCost, reset } from '../../redux/reducers/cost-slice';

interface RecipePageProps {
    recipe: RecipeObject,
    recipeImage: string,
    materials: Array<MaterialObject>,
    crystals: Array<CrystalObject>
}

function RecipePage(props: { data: RecipePageProps }) {

    // Redux
    const dispatch = useDispatch();

    // State
    const totalNumOfMaterials = props.data.materials.length;

    const crystalImagesPath = require.context('../../assets/crystal-icons/', true);

    function createMaterialDivs(materials: Array<MaterialObject>) {

        return materials.map((material, index) => {

            return <MaterialRow data={{ material, index, totalNumOfMaterials }} key={"material-row-" + index} />

        })
    }

    useEffect(() => {
        dispatch(reset())
        for (let i = 0; i < totalNumOfMaterials; i++) {
            dispatch(addToTotalCost(0))
        }

    }, [dispatch, totalNumOfMaterials]);




    return (
        <div id="recipe-info">
            <h1 id="recipe-title">{props.data.recipe.name}</h1>
            <div id="recipe-craft-info">
                <img id="recipe-img" src={props.data.recipeImage} alt={`${props.data.recipe.name} recipe`} />
                <div id="recipe-details">
                    <p>- Recipe Level: {props.data.recipe.level}</p>
                    {(props.data.recipe.item_level !== null && props.data.recipe.item_level !== "null")
                        ? <p>- Recipe Item Level: {props.data.recipe.item_level}</p>
                        : null}
                    {(props.data.recipe.type !== "null" && props.data.recipe.type !== null)
                        ? <p>- {props.data.recipe.type}</p>
                        : null}
                </div>
                <div id="recipe-link">
                    <img src={websiteIcon} alt="Eorzea database" />
                    <a target="_blank" rel="noreferrer" href={props.data.recipe.link}> Eorzea Database Link</a>
                </div>

            </div>
            <CostsAndProfit recipe={props.data.recipe} />
            {/* <div id="calculations-container">
                <div id="profits"></div>
                <div id="costs"></div>
            </div> */}
            <div id="materials-container">
                <h1 id="materials-title">Materials</h1>
                {createMaterialDivs(props.data.materials)}

            </div>
        </div>
    );
};


export default RecipePage;