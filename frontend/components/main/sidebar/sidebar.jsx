import React, { Component } from "react";
import SidebarHeaderContainer from "./sidebar_header_container";
import ChannelSidebarContainer from "./joined/channel_sidebar_container";
import DMSidebarContainer from "./joined/dm_sidebar_container";

class Sidebar extends Component {
    render(){
        return (
            <div className="sidebar">
                <SidebarHeaderContainer />
                <div className="sidebar-content">
                    <ChannelSidebarContainer />
                    <DMSidebarContainer />
                </div>
            </div>
        )
    }
}

export default Sidebar;