import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debounce from "lodash/debounce"
import AddUsersModalContainer from "./add_users_modal_container";

class CreateChannelModal extends Component {
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
            name: "",
            topic: "",
            isPrivate: false,
            nameError: "",
            remainingChars: 80,
            extraHeight: false,
            addUsers: false,
        }
        this.nameExists = this.props.nameExists
        this.mounted = true;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.closeModal = this.props.closeModal
    }

    handleClose(e) {
        e.preventDefault();
        this.closeModal();
    }

    handleChange(e) {
        e.persist();
        const id = e.target.id
        let count = this.state.remainingChars
        let val = e.target.value
        if (id === "name") {
            if (!this.debounce) {
                this.debounce = debounce( () => {
                    if ( this.mounted ) {
                        this.props.checkName(this.state.name).then( () => {
                            this.checkNameErrs()
                        }
                        )
                    }
                }, 700 );
            }
            val = val.toLowerCase();
            count = 80 - val.length
            this.debounce()
        }
        this.setState({ [id]: val, remainingChars: count })
    }

    checkNameErrs(name){
        if ( this.mounted ) {
            name = name || this.state.name;
            let err;
            let height = "";
            if ( name.length === 0 ) {
                err = "Don’t forget to name your channel.";
            } else if ( this.props.nameExists ) {
                err = "That name is already taken by a channel or user."
                height = "mid"
            } else if ( !this.validName(name) ) {
                err = "Channel names can’t contain spaces, periods, or most punctuation. Try again?";
                height = "tall"
            } else { err = "" };
            err = err ? ( <span className={`error ${ name.length === 0 ? "empty" : "symbol"}`}>{err}</span> ) : "";
            this.setState({ nameError: err, extraHeight: height });
        }
    }

    validName(name) {
        const valid = name.search(/^[\w-_\[\]]*$/);
        return valid !== -1;
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name, topic, isPrivate } = this.state;
        const channel = { name, topic, isPrivate }
        this.props.create(channel).then( ({ id }) => {
            this.newChannel = id
            this.setState({ addUsers: true }) 
        });
    }

    handleFocus(e) {
        e.target.className += " focus-blue"
    }

    handleBlur(e) {
        e.target.className = e.target.className.split(" ").filter( c => c !== "focus-blue" ).join(" ");
    }

    render(){
        return (
            <> { !this.state.addUsers ? (
            <figure className={`create-channel-modal ${ this.state.extraHeight }`}>
                <section className="head">
                    <h2>Create a{this.state.isPrivate ? " private" : ""} channel</h2>
                    <button onClick={ () => this.props.closeModal() } >
                        <figure className="x" >
                            <span>
                                x
                            </span>
                        </figure>
                    </button>
                </section>
                <p>
                    Channels are how you communicate with friends or groups. Seperate channels cover different interests - like #dnd.
                </p>
                <form onSubmit={ this.handleSubmit }>

                    <label htmlFor="name">Name <br/>
                        { this.state.nameError ? (
                            <>{ this.state.nameError }</>
                        ) : null }
                        <FontAwesomeIcon icon={ this.state.isPrivate ? "lock" : "hashtag" } />
                        <input type="text" id="name"
                            onChange={ this.handleChange }
                            value={ this.state.name }
                            onFocus={ this.handleFocus } 
                            onBlur={ this.handleBlur }
                            placeholder="e.g. beach-trip" />
                        <div className="counter">
                            { this.state.remainingChars }
                        </div>
                    </label>

                    <label htmlFor="topic">Description <span className="opt">(optional)</span> <br/>
                        <input type="text" id="topic"
                            onFocus={ this.handleFocus }
                            onChange={ this.handleChange }
                            value={ this.state.topic }
                            onBlur={ this.handleBlur } />
                            <br/>
                            <span className="subline">What's this channel about?</span>
                    </label>

                    <label htmlFor="private" className="private">
                        <p>
                            <strong>Make private</strong> <br/>
                            { !this.state.isPrivate ? (
                                <>
                                    When a channel is set to private, it can only be viewed or joined by invitation.
                                </>
                            ) : (
                                <>
                                    <span>This can't be undone.</span> A private channel cannot be made public later on.
                                </>
                             )}
                        </p>
                        <label className="slide-box">
                            <input type="checkbox" id="private"
                                onClick={ () => this.setState({ isPrivate: !this.state.isPrivate }) } />
                            <span className="slider"></span>
                        </label>
                    </label>


                    <button 
                        disabled={ !!this.state.nameError || this.state.name.length === 0 }
                        className={ this.state.nameError || this.state.name.length === 0 ? "not-valid" : "valid"} >
                        Create
                    </button>
                </form>
            </figure>
            ) : (
                <AddUsersModalContainer
                    icon={ this.state.private ? "lock" : "hashtag" }
                    name={ this.state.name }
                    channelId={ this.newChannel }
                     />
            ) }
            </>
        )
    }
}
export default CreateChannelModal