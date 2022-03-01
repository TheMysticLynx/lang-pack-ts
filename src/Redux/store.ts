import { configureStore } from "@reduxjs/toolkit";
import optionSlice from "./slices/optionSlice";
import valueSlice from "./slices/valueSlice";

export const store = configureStore({
    reducer: {
        value: valueSlice,
        option: optionSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch