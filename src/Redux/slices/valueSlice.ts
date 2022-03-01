import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { Value } from "sass";
import { RootState, store } from "../store";
import langFile from "../../assets/en_US.lang";
import { filter } from "jszip";

export interface LangValue {
    key: string,
    value: string
}

interface ValueDictionary { [key: string]: string }

interface ValueState {
    defaultValues: ValueDictionary,
    values: ValueDictionary,
    filters: {
        [key: string]: boolean
    }
}

const initialState: ValueState = {
    defaultValues: {},
    values: {},
    filters: {}
};

const valueSlice = createSlice({
    name: "value",
    initialState,
    reducers: {
        setDefaultValues: (state, action: PayloadAction<ValueDictionary>) => {//TODO Move to thunk?
            state.values = {};
            state.defaultValues = action.payload;

            let filters: string[] = [];
            for (let key in state.defaultValues) {
                let v = key.split(".")[0].trim();
                if (v != '') {
                    filters.push(v);
                }
            }
            state.filters = {};
            filters.forEach((s) => {
                state.filters[s] = false;
            })
        },
        setValue: (state, action: PayloadAction<LangValue>) => {
            state.values[action.payload.key] = action.payload.value;
        },
        setValues: (state, action: PayloadAction<ValueDictionary>) => {
            state.values = action.payload;
        },
        setFilter: (state, action: PayloadAction<[string, boolean]>) => {
            state.filters[action.payload[0]] = action.payload[1];
        },
        initFilters: (state, action: PayloadAction<string[]>) => {
            action.payload.forEach((s) => {
                state.filters[s] = false
            })
        }
    }
})

export const { setDefaultValues, setValue, setValues, setFilter, initFilters } = valueSlice.actions;

export const selectValue = (state: RootState) => state.value

export default valueSlice.reducer