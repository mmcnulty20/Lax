import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LocationDetailsButton from "./location_details";

class SubHeader extends Component {
    render(){
        return (
            <div className="sub-header">
                <div>
                    Location Info Here
                </div>
                <div onClick={(e) => console.log(e.target)}>
                    Larger Button Test
                    <LocationDetailsButton />
                </div>
            </div>
        )
    }
}

export default SubHeader;