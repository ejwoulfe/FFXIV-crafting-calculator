import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    totalCost: 0
};

export const totalCostSlice = createSlice({
    name: "totalCost",
    initialState,
    reducers: {
        reset: () => {
            return initialState
        },
        addToTotalCost: (state, action) => {
            state.totalCost += action.payload;
        },
        subtractFromTotalCost: (state, action) => {
            state.totalCost -= action.payload;
        }
    },

});

export const { reset, addToTotalCost, subtractFromTotalCost } = totalCostSlice.actions;

export default totalCostSlice.reducer;
