import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from './reducers/recipes-slice';
import pageReducer from './reducers/page-slice';
import totalCostReducer from './reducers/cost-slice';


export const store = configureStore({
    reducer: {
        recipesData: recipesReducer,
        pageData: pageReducer,
        costData: totalCostReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
