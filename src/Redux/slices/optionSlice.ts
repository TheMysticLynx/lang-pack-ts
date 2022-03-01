import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Settings {
    version: string
}

const initialState: Settings = {
    version: "1.8"
};

const optionSlice = createSlice({
    name: "option",
    initialState: initialState,
    reducers: {
        setVersion: (state, action: PayloadAction<string>) => {
            state.version = action.payload;
        }
    }
})

export const { setVersion } = optionSlice.actions;
export default optionSlice.reducer;