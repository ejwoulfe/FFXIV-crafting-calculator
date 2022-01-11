import RecipeObject from "../../interfaces/recipe-interface";
import websiteIcon from '../../assets/ui-icons/playguide.png';
import MaterialObject from "../../interfaces/material-interface";
import CrystalObject from "../../interfaces/crystal-interface";

interface RecipePageProps {
    recipe: RecipeObject,
    img: string,
    materials: Array<MaterialObject>,
    crystals: Array<CrystalObject>
}

function RecipePage(props: { data: RecipePageProps }) {

    console.log(props.data.recipe)

    return (
        <div id="recipe-info">
            <h1 id="recipe-title">{props.data.recipe.name}</h1>
            <div id="recipe-craft-info">
                <img src={props.data.img} alt={`${props.data.recipe.name} recipe`} />
                <div id="recipe-details">
                    <p>- Recipe Level: {props.data.recipe.level}</p>
                    {(props.data.recipe.item_level !== null && props.data.recipe.item_level !== "null")
                        ? <p>- Recipe Item Level: {props.data.recipe.item_level}</p>
                        : null}
                    {(props.data.recipe.type !== "null" && props.data.recipe.type !== null)
                        ? <p>- {props.data.recipe.type}</p>
                        : null}
                </div>
                <a href={props.data.recipe.link}><img src={websiteIcon} alt="Eorzea database" />Eorzea Database Link</a>
            </div>
            <div id="calculations-container">
                <div id="profits"></div>
                <div id="costs"></div>
            </div>
            <div id="materials-container">

            </div>
        </div>
    );
};

export default RecipePage;