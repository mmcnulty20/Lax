import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchbarList extends Component {

    componentDidMount(){
        this.props.searchChannels()
    }

    constructor(props){
        super(props)
        this.state = {
            searchString: "",
        }
    }

    filterResults(){
        const search = this.state.searchString.toLowerCase();
        const filtered = this.props.search.filter( c => c.name.slice(0, search.length).toLowerCase() === search )
        return filtered.slice(0,10)
    }

    formatResults(){
        const filtered = this.state.searchString.length === 0 ? "" : this.filterResults()
        return filtered.length !== 0 ? (
            <>
                <li key="string" className="string" >
                    <FontAwesomeIcon icon="search" />
                    <span>
                        { this.state.searchString }
                    </span>
                </li>
                { filtered.map( c => (
                    <li key={ c.id } className="link"
                        onMouseDown={ e => e.preventDefault() }
                        // onClick={ e => {
                            // this.props.history.push(`/c/${c.id}`) 
                            // this.props.close()
                         >
                        <Link to={ `/c/${c.id}` }>
                            <FontAwesomeIcon icon={ c.isPrivate ? "lock" : "hashtag" } />
                            <span>
                                { c.name }
                            </span>
                            { c.member ? null : <span>Not a member</span> }
                        </Link>
                    </li>
                ))}
            </>
            ) : (
            <> 
                { this.state.searchString.length === 0 ? (
                    <li key="no" className="no-search">
                        Narrow your search
                    </li>
                ) : ( 
                    <li key="string" className="string" >
                        <FontAwesomeIcon icon="search" />
                        <span>
                            { this.state.searchString }
                        </span>
                    </li>
                ) }

                <li className="no-search">
                    <FontAwesomeIcon icon="search" />
                    Search for a channel name
                </li>
            </>
            )
    }

    render(){
        return(
            <div className="header-searchbar-dropdown"
                tabIndex="0"
                // onFocus={ () => this.props.focus() }

                onBlur={ () => this.props.close() } >
                <div key="input" className="input">
                    <FontAwesomeIcon icon="search" />

                    <input type="text"
                        autoFocus={ true }
                        onChange={ e => this.setState({ searchString: e.target.value }) }
                        value={ this.state.searchString } />

                    <button className="clear" 
                        onClick={ () => this.setState({ searchString: "" }) }>
                        Clear
                    </button>
                    
                    <button onClick={ () => this.props.close() } >
                        <figure className="x" >
                            <span>
                                x
                            </span>
                        </figure>
                    </button>
                </div>
                <ul>
                    { this.formatResults() }
                </ul>
            </div>
        )
    }
}

export default SearchbarList;