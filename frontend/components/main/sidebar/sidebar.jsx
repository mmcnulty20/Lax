import React, { Component } from "react";
import SidebarHeaderContainer from "./sidebar_header_container";

class Sidebar extends Component {
    render(){
        return (
            <>
                <div>Totally a sidebar</div>
                <SidebarHeaderContainer />
            </>
        )
    }
}

export default Sidebar;