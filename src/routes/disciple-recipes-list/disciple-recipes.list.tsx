import './disciple-recipes.scss';
import { useParams } from 'react-router-dom'

export default function DisciplesRecipeList() {
    const { disciple } = useParams()


    return (
        <div id="disciples-recipe-list">

            <h1 id="title">{disciple} Recipes</h1>


        </div>
    )
}