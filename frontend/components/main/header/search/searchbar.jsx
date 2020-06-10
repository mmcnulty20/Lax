import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchListContainer from "./search_list_container";
import { withRouter } from "react-router-dom";

class Searchbar extends Component {
    componentDidUpdate(prevProps, prevState){
        if ( prevProps.location.pathname !== this.props.location.pathname ) {
            this.setState({ open: false })
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }

    handleClose(e){
        this.setState({ open: false })
    }
    handleOpen(e){
        this.setState({ open: true })
    }

    render(){
        return (
            <div className="header-searchbar"
                tabIndex="0"
                onClick={ this.handleOpen }>
                <figure
                    className="search-button" >
                    Find a channel and start relaxing

                </figure>
                { this.state.open ? (
                        <SearchListContainer 
                            history={ this.props.history }
                            close={ this.handleClose } />
                    ) : null }
                <FontAwesomeIcon icon="search" />
            </div>
        )
    }
}

export default withRouter(Searchbar);