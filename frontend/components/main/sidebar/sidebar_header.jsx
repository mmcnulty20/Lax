import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ComposeButton from "./compose_button";
import SidebarHeaderDropdown from "./sidebar-header-dropdown";

class SidebarHeader extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            open: false,
        }
    }

    render(){
        return (
            <div className="sidebar-head" 
                tabIndex="0"
                onFocus={ () => this.setState({ open: !this.state.open }) } 
                onBlur={ () => this.setState({ open: false }) }>
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
                        logout={ this.props.logout }
                        open={ this.state.open }
                        user={ this.props.currentUser } />
                ) : null }
            </div>
        )
    }
}

export default SidebarHeader;