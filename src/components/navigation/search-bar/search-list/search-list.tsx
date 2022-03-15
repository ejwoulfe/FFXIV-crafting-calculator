import './search-list.scss';
import RecipeObject from '../../../../interfaces/recipe-interface';
import { Link } from 'react-router-dom';

interface SearchListProps {
    searchResults: Array<RecipeObject>
}

export default function SearchList(recipes: SearchListProps) {

    // Given the array of recipe objects, create a list item for each showing an image and name.
    function createListOfRecipes(list: Array<RecipeObject>) {
        if (list.length === 0) {
            return (

                <p id="no-search-results"> No Search Results</p>

            )
        } else {
            const images = require.context('../../../../assets/recipe-icons/', true);

            return list.map((recipe: RecipeObject, index: number) => {
                let filePath = images(`./${recipe.icon}`).default;

                let disciple = getDiscipleName(recipe.disciple_id);

                return (
                    <Link to={`/disciple/${recipe.disciple_id}/recipes/recipe/${recipe.recipe_id}`}
                        className="recipe-list-item"
                        state={{
                            recipe: recipe,
                            recipeImage: filePath
                        }}
                        key={"recipe-" + index} >

                        <img className="recipe-icon" src={filePath} alt={`${recipe.name} icon`} />
                        <span className="recipe-info-text">
                            <p className="recipe-disciple">{disciple}</p>
                            <p className="recipe-name">{recipe.name}</p>
                        </span>
                    </Link>
                )

            })
        }
    }

    function getDiscipleName(discipleId: number) {

        switch (discipleId) {
            case 1:
                return "alchemist"
            case 2:
                return "armorer"
            case 3:
                return "blacksmith"
            case 4:
                return "carpenter"
            case 5:
                return "culinarian"
            case 6:
                return "goldsmith"
            case 7:
                return "leatherworker"
            case 8:
                return "weaver"
            default:
                return "unknown"

        }

    }

    return (
        <ul id="recipe-list">
            {createListOfRecipes(recipes.searchResults)}
        </ul>
    )
}