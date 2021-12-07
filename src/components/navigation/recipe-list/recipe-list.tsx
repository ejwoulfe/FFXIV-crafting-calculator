import './recipe-list.scss';
import RecipeObject from '../../../interfaces/recipe-interface';


export default function RecipeList(props: { list: RecipeObject[] }) {


    function createListOfRecipes(recipes: RecipeObject[]) {

        const images = require.context('../../../assets/recipe-icons/', true);
        return recipes.map((recipe: RecipeObject, index: number) => {
            let disciple = "";

            if (recipe.disciple_id === 1) {
                disciple = "alchemist";
            } else if (recipe.disciple_id === 2) {
                disciple = "armorer";
            } else if (recipe.disciple_id === 3) {
                disciple = "blacksmith";
            } else if (recipe.disciple_id === 4) {
                disciple = "carpenter";
            } else if (recipe.disciple_id === 5) {
                disciple = "culinarian";
            } else if (recipe.disciple_id === 6) {
                disciple = "goldsmith";
            } else if (recipe.disciple_id === 7) {
                disciple = "leatherworker";
            } else if (recipe.disciple_id === 8) {
                disciple = "weaver";
            }

            let img = recipe.name.replace(/\s+/g, '-').toLowerCase().replace(/\\/g, "/");
            console.log(img)
            let source = images(`./${disciple}/${img}.png`).default;
            return (
                <li className="recipe-list-item" key={"recipe-" + index}>
                    <img src={source} alt={`${recipe.name} icon`} />
                    <p>{recipe.name}</p>
                </li>


            )
        })

    }

    return (
        <div id="recipe-list" >
            <ul id="search-list">
                {createListOfRecipes(props.list)}
            </ul>
        </div>

    )
}