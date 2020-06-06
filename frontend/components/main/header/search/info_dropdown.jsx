import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class InfoDropdown extends Component {
    render(){
        return (
            <button>
                <FontAwesomeIcon icon={["far", "question-circle"]} />
            </button>
        )
    }
}

export default InfoDropdown;