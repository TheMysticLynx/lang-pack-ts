import JSZip from "jszip";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { setFilter } from "../Redux/slices/valueSlice";
import { RootState, store } from "../Redux/store";
import Dropdown from "./Dropdown";
import './Sidebar.sass';
import SidebarFilterItem from "./SidebarFilterItem";

const connector = connect((state: RootState) => (
    {filters: state.value.filters}
));

class Sidebar extends React.Component<ConnectedProps<typeof connector>> {

    generate = () => {
        let storeState = store.getState();
        switch(storeState.option.version) {
            case "1.8":
                let zip = new JSZip();
                zip.file("pack.mcmeta", JSON.stringify({
                    "pack": {
                        "pack_format": 5,
                        "description": "A Minecraft langauge pack"
                    }
                }));

                let folder = zip.folder("assets")?.folder("minecraft")?.folder("lang");

                let s = '';

                for(let k in storeState.value.values) {
                    if(k != '' && k != storeState.value.defaultValues[k]) {
                        s += `${k}: ${storeState.value.values[k]}\n`;
                    }
                }

                folder?.file("en_us.lang", s);

                zip.generateAsync({type: "blob"}).then(content => {
                    let a = document.createElement("a");
                    a.href = URL.createObjectURL(content);
                    a.download = "Langauge Pack.zip";
                    a.click();
                });
                break;
        }

        

    }

    render() {
        let { filters } = this.props;
        let keys = Object.keys(filters);

        return (
            <div className="Sidebar">
                <Dropdown text="Change Log">
                    <h1>V1.0.0</h1>
                    <p>Release</p>
                </Dropdown>
                <br />
                <Dropdown text="Settings">
                    <p>Version: 1.8</p>
                    <p>Language: English</p>
                    <p>WIP</p>
                </Dropdown>
                <br />
                <Dropdown text="Filters">
                    <p>Visually filter items</p>
                    {
                        keys.map((key, i) => {
                            return (<SidebarFilterItem key={i} target={key} />)
                        })
                    }
                </Dropdown>
                
                <button onClick={this.generate}>Generate</button>
            </div>
        )
    }

}



export default connector(Sidebar);