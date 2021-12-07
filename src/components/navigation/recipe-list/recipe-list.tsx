import { useEffect } from "react"
import './recipe-list.scss';
import RecipeObject from '../../../interfaces/recipe-interface';

export default function RecipeList(props: { list: RecipeObject[] }) {



    function createListOfRecipes(recipes: RecipeObject[]) {

        const images = require.context('../../../assets/recipe-icons/weaver', true);
        return recipes.map((recipe: RecipeObject, index: number) => {


            let img = recipe.name.replace(/\s+/g, '-').toLowerCase();
            let source = images(`./${img}.png`).default;
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
            <ul>
                {createListOfRecipes(props.list)}
            </ul>
        </div>

    )
}