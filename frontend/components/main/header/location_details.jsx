import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LocationDetailsButton extends Component {
    render(){
        return (
            <button className="location-details">
                <FontAwesomeIcon icon="info-circle" />
                <span>
                    Details
                </span>
            </button>
        )
    }
}

export default LocationDetailsButton;