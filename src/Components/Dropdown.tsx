import React from "react";
import down from "../SVG/down.svg";
import './Dropdown.sass';

interface Props {
    children: React.ReactNode;
    width?: string | number;
    text: string;
    className?: string;
    header?: boolean;
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
            width: this.props.width ?? "calc(100% - 1em)"
        }
    }


    render(): React.ReactNode {

        return (
            <div className={"Dropdown " + (this.state.isOpen ? "open" : "")}>
                {this.props.header ? 
                <h1 onClick={() => {this.setState({"isOpen": !this.state.isOpen})}}>{this.props.text} <img className="down" src={down} /></h1> :
                <p onClick={() => {this.setState({"isOpen": !this.state.isOpen})}}>{this.props.text} <img className="down" src={down} /></p> 
                }
                <div className="content" style={{"width": this.state.width}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Dropdown;