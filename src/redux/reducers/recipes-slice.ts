import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RecipeObject from "../../interfaces/recipe-interface";

export interface RecipesState {
    recipes: Array<RecipeObject>,
    keyword: string,
    sortNumber: number
}

export const fetchAsyncRecipes = createAsyncThunk('recipes/fetchAsyncRecipes', async (discipleId: string) => {
    const controller = new AbortController();
    const response = await fetch(`https://brave-lalande-048a9a.netlify.app/disciple/id&=${discipleId}/recipes`, { signal: controller.signal });
    if (!response.ok) {
        controller.abort();
    }
    return await response.json() as Array<RecipeObject>;
})


const initialState = {
    recipes: [],
    keyword: "",
    sortNumber: 0
};

export const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },
        changeSortNumber: (state, action) => {
            state.sortNumber = action.payload;
        },
        keywordSubmitted: (state, action) => {
            state.keyword = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncRecipes.pending, (state, action) => {

        })
        builder.addCase(fetchAsyncRecipes.fulfilled, (state: RecipesState, action) => {
            state.recipes.push(...action.payload)
        })
        builder.addCase(fetchAsyncRecipes.rejected, (state, action) => {
            console.log("There was an error while retrieving data.")
        })
    }

});

export const { reset, changeSortNumber, keywordSubmitted } = recipesSlice.actions;

export default recipesSlice.reducer;
