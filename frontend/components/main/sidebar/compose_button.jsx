import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ComposeButton extends Component {
    render(){
        return (
            <button className="sidebar-header-compose">
                <FontAwesomeIcon icon="feather-alt" />
            </button>
        )
    }
}

export default ComposeButton;