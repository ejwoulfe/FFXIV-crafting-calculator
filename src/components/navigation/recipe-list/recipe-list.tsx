import { useEffect } from "react"
import './recipe-list.scss';
import RecipeObject from '../../../interfaces/recipe-interface';

export default function RecipeList(props: { list: RecipeObject[] }) {


    // disciple_id: 3
    // icon: "../../assets/recipe-icons/blacksmith/test-fire-target-dummy.png"
    // item_level: null
    // level: 70
    // link: "https://na.finalfantasyxiv.com/lodestone/playguide/db/recipe/98306f42b61/"
    // name: "Test-fire Target Dummy"
    // recipe_id: 1149
    // total_crafted: 1
    // type: "null"

    // useEffect(() => {

    //     console.log(props.list)

    // }, [props])

    function createListOfRecipes(recipes: RecipeObject[]) {

        return recipes.map((recipe: RecipeObject, index: number) => {
            let imgPath = `../${recipe.icon}`
            return (
                <li className="recipe-list-item" key={"recipe-" + index}>

                    <p>{recipe.name}</p>
                </li>
            )
        })

    }

    // function Img(image: any) {

    //     return <img width="100" src={require("" + image)} alt="asd" />

    // };

    return (
        <div id="recipe-list" >
            <ul>
                {createListOfRecipes(props.list)}
            </ul>
        </div>

    )
}