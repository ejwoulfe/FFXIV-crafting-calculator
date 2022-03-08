import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CostState {
    totalCost: Array<number>,
}
export interface PayloadObject {
    index: number,
    total: number
}
const initialState = {
    totalCost: []
};

export const totalCostSlice = createSlice({
    name: "totalCost",
    initialState,
    reducers: {
        reset: () => {
            return initialState
        },
        addToTotalCost: (state: CostState, action) => {
            state.totalCost.push(action.payload);
        },
        updateCost: (state: CostState, action: PayloadAction<PayloadObject>) => {

            state.totalCost.splice(action.payload.index, 1, action.payload.total);
        }
    },

});

export const { reset, addToTotalCost, updateCost } = totalCostSlice.actions;

export default totalCostSlice.reducer;
