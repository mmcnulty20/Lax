import React, { Component } from "react";
import Searchbar from "./searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchHeader extends Component {
    render(){
        return (
            <div>
                Totally the searchHeader
                <Searchbar />
                <FontAwesomeIcon icon={["far", "question-circle"]} />
            </div>
        )
    }
}

export default SearchHeader;