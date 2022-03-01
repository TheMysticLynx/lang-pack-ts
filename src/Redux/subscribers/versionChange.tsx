import { RootState, store } from "../store";
import Lang1_8 from "../../assets/lang/1.8/en_US.lang";
import Lang1_18_2 from "../../assets/lang/1.18.2/en_us.json";
import { setDefaultValues } from "../slices/valueSlice";
import { json } from "stream/consumers";

function select(state: RootState) {
    return state.option.version;
}

export function getLangaugeObject(s: string | {[key: string]: string}) {
    switch (store.getState().option.version) {
        case "1.8":
            if(typeof s != "string") { 
                throw new Error("Expected string");
            }
            let defValues: { [key: string]: string } = {};
            s.split("\n").forEach(line => {
                let split = line.split("=");
                if (split.length == 2) {
                    defValues[split[0].trim()] = split[1].trim();
                }
            });
            return defValues;
            break;

        case "1.18.2":
            var use;
            if(typeof s == "string") {
                use = JSON.parse(s);
            } else {
                use = s;
            }
            
            return use;
    }
}

export function importString(s: string | {[key: string]: string}) {
    store.dispatch(setDefaultValues(getLangaugeObject(s)));
}


let currentValue: string;
function handleChange() {
    let previousValue = currentValue;
    currentValue = select(store.getState());
    if (previousValue !== currentValue) {
        switch (currentValue) {
            case "1.8":
                fetch(Lang1_8).then(res => res.text()).then(
                    (res) => {
                        importString(res);
                    }
                )
                break;
            case "1.18.2":
                importString(Lang1_18_2);

         }
    }
}

const unsubscribe = store.subscribe(handleChange);