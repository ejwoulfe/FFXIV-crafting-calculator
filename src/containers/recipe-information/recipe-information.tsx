
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import RecipePage from '../../components/recipe-page/recipe-page';
import MaterialObject from '../../interfaces/material-interface';
import './recipe-information.scss';

export default function RecipeInformation() {
    const location = useLocation();

    const [recipeInfoLoaded, setRecipeInfoLoaded] = useState<boolean>(false);
    const [materials, setMaterials] = useState<Array<MaterialObject>>([])
    const [crystals, setCrystals] = useState<Array<MaterialObject>>([])
    const { recipe, recipeImage } = location.state;



    useEffect(() => {

        if (location.state.materials === undefined) {
            const abortController = new AbortController();
            setRecipeInfoLoaded(false);
            (async () => {
                try {

                    const crystalFetch = await fetch(`http://localhost:5000/crystals/id/${recipe.recipe_id}`, { signal: abortController.signal })
                    const crystals = await crystalFetch.json();
                    setCrystals(crystals);


                    const materialFetch = await fetch(`http://localhost:5000/materials/id/${recipe.recipe_id}`, { signal: abortController.signal })
                    const materials = await materialFetch.json();
                    setMaterials(materials)

                    setRecipeInfoLoaded(true);



                } catch (error: any) {
                    return;

                }
            })();
            return () => {
                abortController.abort();

            }
        } else {

            setCrystals(location.state.crystals);
            setMaterials(location.state.materials);
            setRecipeInfoLoaded(true);


        }
    }, [recipe, location.state])



    return (
        <div id="recipe-page-container">
            {recipeInfoLoaded === true ? <RecipePage data={{ recipe, recipeImage, materials, crystals }} /> : null}
        </div>
    )
}