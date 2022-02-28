import { connect, ConnectedProps } from "react-redux";
import React from "react";
import { RootState } from "../Redux/store";
import { setValue } from "../Redux/slices/valueSlice";
import './Regex.sass';

const connector = connect(
    (state: RootState) => ({
        filters: state.value.filters,
        dValues: state.value.defaultValues,
        values: state.value.values,
    }),
    { setValue }
);

type Props = ConnectedProps<typeof connector> & {

}

type State = {
    regex: string,
    replaceWith: string,
    error?: string,
    success?: string
}

class Regex extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            regex: "",
            replaceWith: "",
            error: "",
            success: ""
        };
    }

    onClick = () => {
        try {
            let regex = new RegExp(this.state.regex);

            let keys = Object.keys(this.props.dValues);

            let vCount = 0;

            keys.forEach(key => {
                let value = this.props.dValues[key];
                if (value) {

                    let newValue = value.replace(regex, this.state.replaceWith);
                    if(newValue !== value){
                        vCount++;
                        console.log(`${key}: ${value} => ${newValue}`);
                        this.props.setValue({key: key, value: newValue});

                        this.setState({success: `${vCount} values replaced`});
                    }
                }
            });

            if(vCount === 0){
                this.setState({error: "No values were replaced"});
            } else {
                this.setState({success: `${vCount} values replaced`});
            }




        } catch (e: any) {
            this.setState({ error: e.message });
        }
    }

    render() {
        return (<div className="Regex">
            <h1>Regex Replace</h1><br />

            <p className="indent">Enter a regex and a replacement string to replace all occurrences of the regex in the values</p><br />
            <p className="indent">Regular Expression</p>

            <input type="text" placeholder="([A-Z])\w+" value={this.state.regex}
                onChange={(e) => { this.setState({ regex: e.target.value }) }} /><br /><br />

            <p className="indent">Replace with</p>

            <input type="text" placeholder="Replace with" value={this.state.replaceWith}
                onChange={e => { this.setState({ replaceWith: e.target.value }) }} />

            <p className="error">{this.state.error}</p>
            <p className="success">{this.state.success}</p><br />

            <button onClick={this.onClick}>Replace</button>
        </div>)
    }
}

export default connector(Regex);