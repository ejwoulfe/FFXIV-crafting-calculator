import RecipeObject from '../../../interfaces/recipe-interface';

function RecipeRow(recipe: { data: RecipeObject }) {

    return (
        <div id="recipe-row">
            <h4>{recipe.data.name}</h4>
        </div>
    );
}

export default RecipeRow;