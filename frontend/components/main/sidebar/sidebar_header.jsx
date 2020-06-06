import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ComposeButton from "./compose_button";

class SidebarHeader extends Component {
    render(){
        console.log(this.props)
        return (
            <div className="sidebar-head">
                <div>
                    <span>
                        Lax
                        <FontAwesomeIcon icon="chevron-down" />
                    </span>
                    <span>
                        { this.props.currentUser.username }
                    </span>
                </div>
                <ComposeButton />
            </div>
        )
    }
}

export default SidebarHeader;