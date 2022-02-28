import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { Value } from "sass";
import { RootState } from "../store";
import langFile from "../../assets/en_US.lang";

interface LangValue {
    key: string,
    value: string
}

interface ValueDictionary {
    [key: string]: LangValue
}

interface ValueState {
    defaultValues: LangValue[],
    values: ValueDictionary,
    filters: Set<string>
}

const initialState: ValueState = {
    defaultValues: [],
    values: {},
    filters: new Set<string>()
};

const valueSlice = createSlice({
    name: "value",
    initialState,
    reducers: {
        setDefaultValues: (state, action: PayloadAction<LangValue[]>) => {
            state.defaultValues = action.payload;
        },
        setValue: (state, action: PayloadAction<LangValue>) => {
            state.values[action.payload.key] = action.payload;
        },
        addFilter: (state, action: PayloadAction<string>) => {
            state.filters.add(action.payload);
        },
        removeFilter: (state, action: PayloadAction<string>) => {
            state.filters.delete(action.payload);
        }
    }
})

export const { setDefaultValues } = valueSlice.actions;

export const selectValue = (state: RootState) => state.value

export default valueSlice.reducer