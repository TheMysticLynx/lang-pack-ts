import { connect, ConnectedProps } from "react-redux";
import React from "react";
import { RootState } from "../Redux/store";
import { setValue } from "../Redux/slices/valueSlice";
import Dropdown from "../Components/Dropdown";
import "./Home.sass";

const connector = connect((state: RootState) => ({ filters: state.value.filters, dValues: state.value.defaultValues, values: state.value.values }), { setValue });

type Props = ConnectedProps<typeof connector> & {

}

class Home extends React.Component<Props> {
    render() {
        let keys = Object.keys(this.props.filters);
        let dValueKeys = Object.keys(this.props.dValues);

        return (
            <div className="Home">
                <p>Start selecting filters on the left-side bar to start!</p>
                <br />
                {keys.map((key, i) => {
                    if (this.props.filters[key]) {
                        return (<div key={i}>
                            <Dropdown text={key} header className="key-header">
                                {dValueKeys.filter((e) => {
                                    return e.split(".")[0].toLowerCase() === key.toLowerCase();
                                }).map((dKey, i) => {
                                    return(
                                        <div key={i}>
                                            <p>{dKey}</p><input 
                                            placeholder={this.props.dValues[dKey]} 
                                            onChange={
                                                (e) => {
                                                    this.props.setValue({key: dKey, value: e.target.value})
                                                }
                                            }
                                            value={this.props.values[dKey]}
                                            className="lang-input"></input><br />
                                        </div>
                                    )
                                })}
                            </Dropdown>
                            

                            <br key={i}/>
                        </div>)
                    }
                })}
            </div>
        );
    }
}

export default connector(Home);