import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Searchbar extends Component {
    render(){
        return (
            <div className="header-searchbar">
                <span>
                    Totally a searchbar
                </span>
                <FontAwesomeIcon icon="search" />
            </div>
        )
    }
}

export default Searchbar;