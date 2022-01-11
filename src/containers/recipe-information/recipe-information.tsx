
import { useLocation } from 'react-router-dom'
import RecipePage from '../../components/recipe-page/recipe-page';

export default function RecipeInformation() {
    const location = useLocation();
    const { recipe, img } = location.state;

    console.log(recipe)
    console.log(img)
    return (
        <div id="recipe-page-container">
            <RecipePage />
        </div>
    )
}