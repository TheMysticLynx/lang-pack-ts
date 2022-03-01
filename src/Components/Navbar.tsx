import React from "react";
import { NavLink } from "react-router-dom";
import githubLogo from '../SVG/github-icon.svg'

import './Navbar.sass'

class Navbar extends React.Component {
    render(): React.ReactNode {
        return (
            <nav className="Navbar">
                <img src={githubLogo} alt=""/>
                <h1>Langauge Pack Generator</h1>
                <div className="links">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                    <NavLink to="/regex" className={({ isActive }) => isActive ? 'active' : ''}>Regex</NavLink>
                </div>
            </nav>
        )
    }
}

export default Navbar;