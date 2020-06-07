import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ComposeButton from "./compose_button";
import SidebarHeaderDropdown from "./sidebar-header-dropdown";

class SidebarHeader extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            open: true,
        }
    }

    render(){
        console.log(this.props)
        return (
            <div className="sidebar-head">
                <div>
                    <span className="lax-title">
                        <span>
                            Lax
                        </span>
                        <FontAwesomeIcon icon="chevron-down" />
                    </span>
                    <span>
                        { this.props.currentUser.username }
                    </span>
                </div>
                <ComposeButton />
                { this.state.open ? (
                    <SidebarHeaderDropdown
                        user={ this.props.currentUser } />
                ) : null }
            </div>
        )
    }
}

export default SidebarHeader;