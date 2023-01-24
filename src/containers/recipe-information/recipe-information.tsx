import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import RecipeObject from "../../interfaces/recipe-interface";
import RecipePage from "../../components/recipe-page/recipe-page";
import MaterialObject from "../../interfaces/material-interface";
import "./recipe-information.scss";
import CrystalObject from "../../interfaces/crystal-interface";

type Params = {
  disciple: string;
  recipe: string;
};

export default function RecipeInformation() {
  const location = useLocation();
  let { disciple, recipe } = useParams<keyof Params>() as Params;

  const [recipeInfoLoaded, setRecipeInfoLoaded] = useState<boolean>(false);
  const [recipeObject, setRecipeObject] = useState<RecipeObject>();
  const [recipeImage, setRecipeImage] = useState<string>("");
  const [materials, setMaterials] = useState<Array<MaterialObject>>([]);
  const [crystals, setCrystals] = useState<Array<CrystalObject>>([]);

  useEffect(() => {
    if (location.state !== null) {
      setRecipeObject(location.state.recipe);
      setRecipeImage(location.state.recipeImage);
      setMaterials(location.state.materials);
      setCrystals(location.state.crystals);
      setRecipeInfoLoaded(true);
    } else {
      fetchRecipeData(recipe);
      setRecipeInfoLoaded(true);
    }
  }, [location.state, recipe]);

  async function fetchRecipeData(recipeId: string) {
    const fetchRecipe = await fetch(`http://localhost:5000/recipes/id/${recipeId}`);
    const recipe = await fetchRecipe.json();
    setRecipeObject(recipe[0]);
    const recipeImagesPath = require.context("../../assets/recipe-icons/", true);
    let image = recipeImagesPath(`./${recipe[0].icon}`).default;
    setRecipeImage(image);
    const crystalFetch = await fetch(`http://localhost:5000/crystals/id/${recipeId}`);
    const crystals = await crystalFetch.json();
    setCrystals(crystals);

    const materialFetch = await fetch(`http://localhost:5000/materials/id/${recipeId}`);
    const materials = await materialFetch.json();
    setMaterials(materials);
  }

  return (
    <div id="recipe-page-container">
      {recipeInfoLoaded === true && recipeObject !== undefined ? (
        <RecipePage data={{ recipeObject, recipeImage, materials, crystals }} />
      ) : null}
    </div>
  );
}
