import RecipeObject from "../../interfaces/recipe-interface";
import websiteIcon from '../../assets/ui-icons/playguide.png';
import MaterialObject from "../../interfaces/material-interface";
import CrystalObject from "../../interfaces/crystal-interface";
import highQuality from '../../assets/ui-icons/hq.png';
import './recipe-page.scss';

interface RecipePageProps {
    recipe: RecipeObject,
    img: string,
    materials: Array<MaterialObject>,
    crystals: Array<CrystalObject>
}

function RecipePage(props: { data: RecipePageProps }) {

    const materialImages = require.context('../../assets/material-icons/', true);
    // const crystalImages = require.context('../../../assets/crystal-icons/', true);

    console.log(props.data.img)
    // Must be type item
    // https://xivapi.com/search?string_algo=match&string=${itemName}
    // Get item ID then retrieve MB data.
    // https://universalis.app/api/${server}/${itemID}

    function createMaterialDivs(materials: Array<MaterialObject>) {

        return materials.map((material, index) => {
            console.log(material)
            return (
                <div className="material-row" key={'material-' + index}>
                    <span className="material-details">
                        <p>HQ?</p>
                        <img className="hq-img" src={highQuality} alt="high quality item" />
                        <img src={materialImages(`./${material.icon}`).default} alt={material.name} />
                        <h4>{material.quantity}</h4>
                        <h4>{material.name}</h4>
                    </span>
                    <ul className="material-calculations">
                        <li className="hq">HQ</li>
                        <li className="price-per">Price Per</li>
                        <li className="quantity">QTY</li>
                        <li className="total">TOTAL</li>
                        <li className="arrow">arrow</li>
                    </ul>
                </div>)
        })
    }

    return (
        <div id="recipe-info">
            <h1 id="recipe-title">{props.data.recipe.name}</h1>
            <div id="recipe-craft-info">
                <img id="recipe-img" src={props.data.img} alt={`${props.data.recipe.name} recipe`} />
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