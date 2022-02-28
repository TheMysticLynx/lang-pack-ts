import React from "react";
import Dropdown from "./Dropdown";
import './Sidebar.sass';

class Sidebar extends React.Component {

    render() {
        return (
            <div className="Sidebar">
                <Dropdown text="Filters">
                    <p>Visually filter items</p>
                </Dropdown>
            </div>
        )
    }

}

export default Sidebar;