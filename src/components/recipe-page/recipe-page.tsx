import RecipeObject from "../../interfaces/recipe-interface";
import websiteIcon from '../../assets/ui-icons/playguide.png';
import MaterialObject from "../../interfaces/material-interface";
import CrystalObject from "../../interfaces/crystal-interface";
import highQuality from '../../assets/ui-icons/hq.png';
import './recipe-page.scss';

interface RecipePageProps {
    recipe: RecipeObject,
    recipeImage: string,
    materials: Array<MaterialObject>,
    crystals: Array<CrystalObject>
}

function RecipePage(props: { data: RecipePageProps }) {


    const materialImagesPath = require.context('../../assets/material-icons/', true);
    const crystalImagesPath = require.context('../../assets/crystal-icons/', true);

    // Must be type item
    // https://xivapi.com/search?string_algo=match&string=${itemName}
    // Get item ID then retrieve Marketboard data.
    // https://universalis.app/api/${server}/${itemID}

    function createMaterialDivs(materials: Array<MaterialObject>) {

        return materials.map((material, index) => {
            return (
                <div className="material-row" key={'material-' + index}>
                    <span className="material-details">
                        <span className="hq-checkbox-container">
                            <label>HQ?</label>
                            <input type="checkbox" className="hq-checkbox" name="hq checkbox" value="hq" />
                        </span>
                        <img src={materialImagesPath(`./${material.icon}`).default} alt={material.name} />
                        <h3>x{material.quantity}</h3>
                        <h3 className="material-name">{material.name}</h3>
                    </span>
                    <div className="material-calculations">
                        <span className="hq">
                            <h4>HQ</h4>
                            <img className="hq-img" src={highQuality} alt="high quality item" />
                        </span>

                        <span className="price-per"><h4>Price Per</h4></span>
                        <span className="quantity"><h4>QTY</h4></span>
                        <span className="total"><h4>TOTAL</h4></span>
                        <span className="arrow"><h4>arrow</h4></span>
                    </div>
                </div>)
        })
    }

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
            <div id="calculations-container">
                <div id="profits"></div>
                <div id="costs"></div>
            </div>
            <div id="materials-container">
                {createMaterialDivs(props.data.materials)}

            </div>
        </div>
    );
};

export default RecipePage;