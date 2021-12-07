import './recipe-list.scss';
import RecipeObject from '../../../interfaces/recipe-interface';


export default function RecipeList(props: { list: RecipeObject[] }) {


    function createListOfRecipes(recipes: RecipeObject[]) {

        const images = require.context('../../../assets/recipe-icons/', true);
        return recipes.map((recipe: RecipeObject, index: number) => {

            let source = images(`./${recipe.icon}`).default;

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