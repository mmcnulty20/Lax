import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchListContainer from "./search_list_container";

class Searchbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }

    handleClose(e){
        this.setState({ open: true })
    }
    handleOpen(e){
        this.setState({ open: true })
    }

    render(){
        console.log(this.state)
        return (
            <div className="header-searchbar"
                tabIndex="0"
                onFocus={ this.handleOpen }>
                <figure
                    className="search-button" >
                    Searchbar coming soon

                </figure>
                { this.state.open ? (
                        <SearchListContainer 
                            close={ this.handleClose } />
                    ) : null }
                <FontAwesomeIcon icon="search" />
            </div>
        )
    }
}

export default Searchbar;