import { createSlice } from "@reduxjs/toolkit";

export interface CurrentPageState {
    currentPage: number
}

const initialState = {
    page: 1
};

export const pageSlice = createSlice({
    name: "currentPage",
    initialState,
    reducers: {
        reset: () => {
            return initialState
        },
        changePage: (state, action) => {
            console.log(action.payload)
            state.page = action.payload;
        }
    },

});

export const { reset, changePage } = pageSlice.actions;

export default pageSlice.reducer;
