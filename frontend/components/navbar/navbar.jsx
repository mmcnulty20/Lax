import React, { Component } from "react";
import NavBarItemContainer from "./navbar_item_container";

class NavBar extends Component {
    render(){
        return(
            <nav>
                <h2>NavBar</h2>
                <NavBarItemContainer />
            </nav>
        )
    }
}

export default NavBar