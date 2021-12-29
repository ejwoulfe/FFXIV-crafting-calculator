import { useState } from "react";
import RecipeObject from "../../interfaces/recipe-interface";

const useData = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortNumber, setSortNumber] = useState<string>("0");
    const [keyword, setKeyword] = useState<string>("");
    const [slicedData, setSlicedData] = useState<Array<RecipeObject>>();


    const onPageChange = (event: any) => {
        setCurrentPage(event.target.value);
    }
    const onSortChange = (event: any) => {
        setSortNumber(event.target.value);
        switch (event.target.value) {
            case "0":
                console.log("0")
                break;
            case "1":
                break;
            case "2":
                // let newRecipesList = props.data.recipesList.sort((a, b) => (a.level > b.level ? -1 : 1));
                // props.data.setRecipesList(newRecipesList);
                // props.data.setSlicedRecipesList(newRecipesList.slice(0, 100));
                break;
            case "3":
                console.log("3")
                break;
            case "4":
                console.log("4")
                break;
            default:
                console.log("default")

        }
    }

    const dataChanged = (recipes: Array<RecipeObject>) => {
        let startIndex = (currentPage - 1) * 100;
        let endIndex = startIndex + 100;
        setSlicedData(recipes.slice(startIndex, endIndex))
        return slicedData;
    }


    return { currentPage, sortNumber, onPageChange, onSortChange, slicedData, setSlicedData, dataChanged }

}

export default useData;