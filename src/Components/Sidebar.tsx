import JSZip from "jszip";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { setFilter, setValues } from "../Redux/slices/valueSlice";
import { RootState, store } from "../Redux/store";
import { setVersion } from "../Redux/slices/optionSlice";
import Dropdown from "./Dropdown";
import './Sidebar.sass';
import SidebarFilterItem from "./SidebarFilterItem";
import { getLangaugeObject, importString } from "../Redux/subscribers/versionChange";

const connector = connect((state: RootState) => (
    { filters: state.value.filters }
), { setValues });

class Sidebar extends React.Component<ConnectedProps<typeof connector>> {
    fileInputRef: React.RefObject<HTMLInputElement>;
    constructor(props: ConnectedProps<typeof connector>) {
        super(props);
        this.fileInputRef = React.createRef();
    }

    generate = () => {
        let storeState = store.getState();
        switch (storeState.option.version) {
            case "1.8":
                var zip = new JSZip();
                zip.file("pack.mcmeta", JSON.stringify({
                    "pack": {
                        "pack_format": 1,
                        "description": "A Minecraft langauge pack"
                    }
                }));

                var folder = zip.folder("assets")?.folder("minecraft")?.folder("lang");

                var s = '';

                for (let k in storeState.value.values) {
                    if (k != '' && k != storeState.value.defaultValues[k]) {
                        s += `${k} = ${storeState.value.values[k]}\n`;
                    }
                }

                folder?.file("en_us.lang", s);

                zip.generateAsync({ type: "blob" }).then(content => {
                    let a = document.createElement("a");
                    a.href = URL.createObjectURL(content);
                    a.download = "Langauge Pack.zip";
                    a.click();
                });
                break;
            case "1.18.2":
                var zip = new JSZip();
                zip.file("pack.mcmeta", JSON.stringify({
                    "pack": {
                        "pack_format": 8,
                        "description": "A Minecraft langauge pack"
                    }
                }));

                var folder = zip.folder("assets")?.folder("minecraft")?.folder("lang");

                let obj: { [key: string]: string } = {};

                for (let k in storeState.value.values) {
                    if (k != '' && k != storeState.value.defaultValues[k]) {
                        obj[k] = storeState.value.values[k];
                    }
                }

                folder?.file("en_us.json", JSON.stringify(obj));

                zip.generateAsync({ type: "blob" }).then(content => {
                    let a = document.createElement("a");
                    a.href = URL.createObjectURL(content);
                    a.download = "Langauge Pack.zip";
                    a.click();
                });
                break;
        }
    }

    onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let file = e.target.files![0];
        let text = await file.text();
        this.props.setValues(getLangaugeObject(text));
    }

    setGenVersion = (e: React.ChangeEvent<HTMLSelectElement>) => {
        store.dispatch(setVersion(e.target.value));
    }

    render() {
        let { filters } = this.props;
        let keys = Object.keys(filters);

        return (
            <div className="Sidebar">
                <input type="file" id="import" style={{ display: "none" }} onChange={this.onFileChange} ref={this.fileInputRef} />
                <Dropdown text="Change Log">
                    <h1>V1.0.0</h1>
                    <p>Release</p>
                </Dropdown>
                <br />
                <Dropdown text="Settings">
                    <p>Version:
                        <select onChange={this.setGenVersion}>
                            <option>1.8</option>
                            <option>1.18.2</option>
                        </select>
                    </p>
                    <p>Language:
                        <select>
                            <option>English</option>
                        </select>
                    </p>
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
                <button onClick={ () => {this.fileInputRef.current?.click()} }>Import</button>
                <br /><br />
                <p>Warning: Imported files are not cheked for errors. Importing invalid .lang files will break the website and require you to reload. Please change your settings to the appropriate version before using import.</p>
            </div>
        )
    }

}



export default connector(Sidebar);