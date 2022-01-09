import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RecipeObject from "../../interfaces/recipe-interface";

export interface RecipesState {
    recipes: Array<RecipeObject>,
    keyword: string,
    sortNumber: number
}

export const fetchAsyncRecipes = createAsyncThunk('recipes/fetchAsyncRecipes', async (discipleId: string) => {
    const response = await fetch(`http://localhost:5000/disciple/id&=${discipleId}/recipes`);
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
            console.log("Pending")
        })
        builder.addCase(fetchAsyncRecipes.fulfilled, (state: RecipesState, action) => {
            state.recipes.push(...action.payload)
        })
        builder.addCase(fetchAsyncRecipes.rejected, (state, action) => {
            console.log("Rejected")
        })
    }

});

export const { reset, changeSortNumber, keywordSubmitted } = recipesSlice.actions;

export default recipesSlice.reducer;
