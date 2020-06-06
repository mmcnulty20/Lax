import React, { Component } from "react";
import Searchbar from "./searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoDropdown from "./info_dropdown";

class SearchHeader extends Component {
    render(){
        return (
            <div className="search-header">
                <Searchbar />
                <InfoDropdown />
            </div>
        )
    }
}

export default SearchHeader;