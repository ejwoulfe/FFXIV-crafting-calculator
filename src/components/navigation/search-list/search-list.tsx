import './search-list.scss';
import RecipeList from '../../../interfaces/recipe-list-interface';
import RecipeObject from '../../../interfaces/recipe-interface';

export default function SearchList(data: { recipes: RecipeList }) {

    // Given the array of recipe objects, create a list item for each showing an image and name.
    function createListOfRecipes(list: RecipeList) {

        const images = require.context('../../../assets/recipe-icons/', true);
        let disciple = "";
        return list.map((recipe: RecipeObject, index: number) => {

            switch (recipe.disciple_id) {
                case 1:
                    disciple = "alchemist"
                    break;
                case 2:
                    disciple = "armorer"
                    break;
                case 3:
                    disciple = "blacksmith"
                    break;
                case 4:
                    disciple = "carpenter"
                    break;
                case 5:
                    disciple = "culinarian"
                    break;
                case 6:
                    disciple = "goldsmith"
                    break;
                case 7:
                    disciple = "leatherworker"
                    break;
                case 8:
                    disciple = "weaver"
                    break;

            }

            let filePath = images(`./${recipe.icon}`).default;

            return (

                <li className="recipe-list-item" key={"recipe-" + index}>
                    <img className="recipe-icon" src={filePath} alt={`${recipe.name} icon`} />
                    <span className="recipe-info-text">
                        <p className="recipe-disciple">{disciple}</p>
                        <p className="recipe-name">{recipe.name}</p>
                    </span>
                </li>
            )
        })
    }



    return (
        <ul id="recipe-list">
            {createListOfRecipes(data.recipes)}
        </ul>
    )
}