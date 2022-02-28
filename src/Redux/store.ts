import { configureStore } from "@reduxjs/toolkit";
import valueSlice from "./slices/valueSlice";

export const store = configureStore({
    reducer: {
        value: valueSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch