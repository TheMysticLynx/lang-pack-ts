import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { setFilter } from "../Redux/slices/valueSlice";
import { RootState } from "../Redux/store";
import Dropdown from "./Dropdown";
import './Sidebar.sass';
import SidebarFilterItem from "./SidebarFilterItem";

const connector = connect((state: RootState) => (
    {filters: state.value.filters}
));

class Sidebar extends React.Component<ConnectedProps<typeof connector>> {

    render() {
        let { filters } = this.props;
        let keys = Object.keys(filters);

        return (
            <div className="Sidebar">
                <Dropdown text="Filters">
                    <p>Visually filter items</p>
                    {
                        keys.map((key, i) => {
                            return (<SidebarFilterItem key={i} target={key} />)
                        })
                    }
                </Dropdown>
            </div>
        )
    }

}



export default connector(Sidebar);