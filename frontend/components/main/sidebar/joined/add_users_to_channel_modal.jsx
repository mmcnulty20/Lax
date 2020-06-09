import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debounce from "lodash/debounce"
import UserSearchContainer from "./user_search_container";

class AddUsersToChannelModal extends Component {
    componentWillUnmount(){
        this.mounted = false;
    }

    shouldComponentUpdate({ nameExists }) {
        if ( nameExists !== undefined ) this.nameExists = nameExists;
        return true;
    }

    constructor(props) {
        super(props)
        this.state = {
            all: true,
            skip: false,
            members: [],
        }

        this.handleRadio = this.handleRadio.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        // this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);

        this._switchSelected = this._switchSelected.bind(this);
    }

    handleClose(e) {
        e.preventDefault();
        this.closeModal();
    }

    handleRadio(e) {
        this._switchSelected(e.target.id === "add-all")
    }

    _switchSelected(all){
        if ( all === false ) {
            this.setState({ all: false, skip: true })
        } else {
            this.setState({ all: true, skip: false, members: [] })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(e.target)
        console.log("hello from submit")
        // this.props.addMembers(this.state.members).then( () => this.props.closeModal() );
    }

    handleFocus(e) {
        e.target.className += " focus-blue";
        this._switchSelected(false)
    }

    handleSearchClick(e) {
        console.log(e.target);
    }

    render(){
        return (
            <figure className="add-users-new-channel">
                <section className="head">
                    <h2>Add people</h2>
                    <div className="channel-name">
                        <FontAwesomeIcon icon={ this.props.icon } />
                        <span>
                            { this.props.name || "doesitwork"}
                        </span>
                    </div>
                    <button onClick={ () => this.props.closeModal() } >
                        <figure className="x" >
                            <span>
                                x
                            </span>
                        </figure>
                    </button>
                </section>
                <form onSubmit={ this.handleSubmit }>

                    <label htmlFor="add-all">
                        
                        <input type="radio"
                            id="add-all"
                            onChange={ this.handleRadio }
                            checked={ this.state.all }
                             />
                        Add all { this.props.users.length } members of <strong>Lax</strong>
                    </label>

                    <label htmlFor="add-specific">
                        
                        <input type="radio"
                            id="add-specific"
                            onChange={ this.handleRadio }
                            checked={ this.state.all === false } />
                            Add specific people
                    </label>

                    <label htmlFor="names">
                        <UserSearchContainer
                            users={ this.props.users }
                            handleClick={ this.handleSearchClick }
                            blur={ this.handleBlur }
                            focus={ this.handleFocus } />
                    </label>

                    <button
                        className={ this.state.skip ? "skip" : "" } >
                        { this.state.skip ? "Skip for now" : "Done" }
                    </button>

                </form>
            </figure>
        )
    }
}

export default AddUsersToChannelModal