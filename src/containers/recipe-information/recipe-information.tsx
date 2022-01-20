
import { useLocation } from 'react-router-dom'
import RecipePage from '../../components/recipe-page/recipe-page';
export default function RecipeInformation() {
    const location = useLocation();
    const { crystals, materials, recipe, recipeImage } = location.state;


    return (
        <div id="recipe-page-container">
            <RecipePage data={{ recipe, recipeImage, materials, crystals }} />
        </div>
    )
}