import './disciple-recipes.scss';
import { useLocation } from 'react-router-dom'
import RecipesList from '../../components/recipes-list/recipes-list';

export default function DisciplesRecipeList() {
    const location = useLocation();
    const { name, src } = location.state;

    return (
        <div id="disciples-recipe-list">

            <h1 id="title">{name} Recipes</h1>
            <img id="disciple-icon" src={src} alt={name + "icon"} />

            <RecipesList />
        </div>
    )
}