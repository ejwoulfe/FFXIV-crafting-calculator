import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from './reducers/recipes-slice';
import pageReducer from './reducers/page-slice';


export const store = configureStore({
    reducer: {
        recipesData: recipesReducer,
        pageData: pageReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
