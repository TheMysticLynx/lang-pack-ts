import React from "react"
import { connect, ConnectedProps } from "react-redux"
import { setFilter } from "../Redux/slices/valueSlice"
import { RootState } from "../Redux/store"

import './SidebarFilterItem.sass'

const connector = connect((state: RootState) => ({}), { setFilter })


type Props = ConnectedProps<typeof connector> & {
    target: string
}

class SidebarFilterItem extends React.Component<Props> {
    render() {
        return (
            <div className="sidebar-filter-item">
                <input type="checkbox" id={this.props.target} onChange={
                    (e) => {
                        this.props.setFilter([this.props.target, e.target.checked]);
                    }
                }/>
                <label htmlFor={this.props.target}> {this.props.target} </label>
                
            </div>
        )
    }
}

export default connector(SidebarFilterItem)