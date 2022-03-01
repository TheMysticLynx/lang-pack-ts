import { connect, ConnectedProps } from "react-redux";
import React from "react";
import { RootState } from "../Redux/store";
import { LangValue, setValues } from "../Redux/slices/valueSlice";
import './Regex.sass';

const connector = connect(
    (state: RootState) => ({
        filters: state.value.filters,
        dValues: state.value.defaultValues,
        values: state.value.values,
    }),
    { setValues }
);

type Props = ConnectedProps<typeof connector> & {

}

type State = {
    regex: string,
    replaceWith: string,
    flags: string,
    error?: string,
    success?: string,
    loading: boolean
}

class Regex extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            regex: "",
            replaceWith: "",
            flags: "g",
            error: "",
            success: "",
            loading: false
        };
    }

    onClick = () => {
        if(this.state.loading) return;
        this.setState({ loading: true });
        try {
            let regex = new RegExp(this.state.regex, this.state.flags);
            let newValues: {[key: string]: string} = {};

            for (let k in this.props.values) {
                newValues[k] = this.props.values[k];
            }

            let changedCount = 0;
            
            let filtered = false;
            for (let k in this.props.filters) {
                if (this.props.filters[k]) {
                    filtered = true;
                }
            }

            for (let key in this.props.dValues) {
                let toBeReplaced  =  this.props.values[key];

                if (filtered && !this.props.filters[key.split('.')[0]]) {
                    console.log(`Skipping ${key}`);
                    continue;
                } else {
                    console.log("test")
                }

                if(toBeReplaced == undefined || toBeReplaced == '') {
                    toBeReplaced = this.props.dValues[key];
                }
                
                let newValue = toBeReplaced.replaceAll(regex, this.state.replaceWith);

                if(newValue != toBeReplaced) {
                    changedCount++;
                    newValues[key] = newValue;
                }
            }

            if(changedCount > 0) {
                this.props.setValues(newValues);
                this.setState({ success: `${changedCount} values replaced` });
                setTimeout(() => {
                    this.setState({ success: "" });
                }, 2000);
            } else {
                this.setState({ error: "No changes made" });
                setTimeout(() => {
                    this.setState({ error: "" });
                } , 2000);
            }

        } catch (e: any) {
            this.setState({ error: e.message });
            setTimeout(() => {this.setState({error: ``});}, 5000)
        }
        this.setState({ loading: false });
    }

    render() {
        return (<div className="Regex">
            <h1>Regex Replace</h1><br />

            <p className="indent">Enter a regex and a replacement string to replace all occurrences of the regex in the values.
            Select atleast one filter from the left-side bar to apply filters.
            </p><br />
            <div className="flex">
                <div>
                    <p className="indent">Regular Expression</p>
                    <input type="text" placeholder="([A-Z])\w+" value={this.state.regex}
                        onChange={(e) => { this.setState({ regex: e.target.value }) }} /> 
                </div>
                <div>
                    <p className="indent">Flags</p>
                    <input type="text" placeholder="g (flags)" className="halfsize" value={this.state.flags} 
                        onChange={(e) => { this.setState({ flags: e.target.value }) }}/>
                    <br /><br />
                </div>
            </div>  

            <p className="indent">Replace with</p>

            <input type="text" placeholder="Replace with" value={this.state.replaceWith}
                onChange={e => { this.setState({ replaceWith: e.target.value }) }} />

            <p className="error">{this.state.error}</p>
            <p className="success">{this.state.success}</p><br />

            <button onClick={this.onClick} className={this.state.loading ? "loading" : ''}>Replace</button>
        </div>)
    }
}

export default connector(Regex);