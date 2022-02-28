import { connect, ConnectedProps } from "react-redux";
import React from "react";
import { RootState } from "../Redux/store";
import { setValues } from "../Redux/slices/valueSlice";
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
            error: "",
            success: "",
            loading: false
        };
    }

    onClick = () => {
        try {
            let regex = new RegExp(this.state.regex, 'g');
            let keys = Object.keys(this.props.dValues);

            let vCount = 0;

            this.setState({loading: true})

            let newValues:  { [key: string]: string } = {}
          
            keys.forEach(key => {
                let value = this.props.values[key] ?? this.props.dValues[key];
                if (value) {

                    let newValue = value.replaceAll(regex, this.state.replaceWith);
                    if(newValue == this.props.dValues[key]) {
                        delete newValues[key]
                    } else if(newValue !== value){
                        vCount++;
                        newValues[key] = newValue
                    }
                }
            });

            this.props.setValues(newValues)
          
            this.setState({loading: false})

            if(vCount === 0){
                this.setState({error: "No values were replaced"});
              setTimeout(() => {this.setState({error: ``});}, 5000)
            } else {
                this.setState({success: `${vCount} values replaced`});
              setTimeout(() => {this.setState({success: ``});}, 5000)
            }
        } catch (e: any) {
            this.setState({ error: e.message });
            setTimeout(() => {this.setState({error: ``});}, 5000)
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