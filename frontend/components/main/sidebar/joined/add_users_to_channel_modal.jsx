import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DefaultAvatarIcon from "../../avatar_icon";
import size from "lodash/size";
import UserSearch from "./user_search";

class AddUsersToChannelModal extends Component {
    componentWillUnmount(){
        this.mounted = false;
    }

    componentDidMount(){
        this.props.retrieveAllUsers();
    }

    constructor(props) {
        super(props)
        this.state = {
            all: true,
            skip: false,
            open: false,
            members: {},
        }

        this.handleRadio = this.handleRadio.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleFocus = this.handleFocus.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);

        this._switchSelected = this._switchSelected.bind(this);
        this.handleMemberRemove = this.handleMemberRemove.bind(this);
    }

    handleClose(e) {
        e.preventDefault();
        Object.values(this.state.members).forEach( m => {
            m.selected = false;
        })
        this.props.closeModal();
    }

    handleRadio(e) {
        this._switchSelected(e.target.id === "add-all")
    }

    _switchSelected(all){
        if ( all === false ) {
            this.setState({ all: false, skip: size(this.state.members) === 0 })
        } else {
            Object.values(this.state.members).forEach( m => m.selected = false )
            this.setState({ all: true, skip: false, members: {} })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const members = this.state.members;
        const newMembers = size(members) > 0 ? Object.keys(members) : 
            this.state.all ? Object.keys(this.props.users) : null
            this.props.history.push(`/c/${ this.props.channelId }`)
        Object.values(this.state.members).forEach( m => m.selected = false )
        if (newMembers !== null ) {
            this.props.addMembers(this.props.channelId, newMembers).then( () => this.props.closeModal() )
            this.props.history.push(`/c/${ this.props.channelId }`)
        } else {
            this.props.closeModal();
        }
    }

    handleFocus(e) {
        if ( e.target.id.slice(0,2) === "s-" ) {
            this.handleSearchClick(e.target.id.slice(2))
        }
        this._switchSelected(false)
    }

    handleSearchClick(id) {
        const newState = { ...this.state.members, [id]: this.props.users[id] }
        this.setState({ members: newState }, () => this._switchSelected(false) )
    }

    handleMemberRemove(e){
        const newState = { ...this.state.members }
        newState[e.target.id].selected = false
        delete newState[e.target.id]
        this.setState({ members: newState }, () => this._switchSelected(false))
    }

    formatMembers(){
        return Object.values(this.state.members).map( user => {
            this.props.users[user.id].selected = true;
            return (
                <li key={user.id}> 
                    <DefaultAvatarIcon username={ user.username } />
                    <span>
                        { user.username }
                    </span>
                    <button className="remove-member"
                        onClick={ this.handleMemberRemove } >
                        <figure className="x" >
                            <span id={ user.id }>
                                x
                            </span>
                        </figure>
                    </button>
                </li>
            )
        } )
    }

    render(){
        const members = this.formatMembers()
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
                    <button onClick={ this.handleClose } >
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
                        Add all { size(this.props.users) } members of <strong>Lax</strong>
                    </label>

                    <label htmlFor="add-specific">
                        
                        <input type="radio"
                            id="add-specific"
                            onChange={ this.handleRadio }
                            checked={ this.state.all === false } />
                            Add specific people
                    </label>

                    <label htmlFor="names">
                        <UserSearch
                            members={ size( this.state.members ) > 0 ? members : [] }
                            users={ Object.values( this.props.users ) }
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