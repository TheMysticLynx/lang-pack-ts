import React from "react";
import down from "../SVG/down.svg";
import './Dropdown.sass';

interface Props {
    children: React.ReactNode;
    width?: string | number;
    text: string;
}

interface State {
    isOpen: boolean;
    width: string | number;
}

class Dropdown extends React.Component<Props , State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
            width: this.props.width ?? "auto"
        }
    }


    render(): React.ReactNode {
        return (
            <div className={"Dropdown " + (this.state.isOpen ? "open" : "")} onClick={() => {this.setState({"isOpen": !this.state.isOpen})}} >
                <p>{this.props.text} <img className="down" src={down} /></p> 
                <div className="content" style={{"width": this.state.width}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Dropdown;