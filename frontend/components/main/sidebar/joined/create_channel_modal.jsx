import React, { Component } from "react";

class CreateChannelModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            description: "",
            private: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClose(e) {
        e.preventDefault();
        this.props.close();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.create(this.state);
    }
    handleFocus(e) {
        e.target.className += " focus-blue" //NOTE: ANIMATED!!!!
    }

    handleBlur(field) {
        return e => {
            console.log(e)
            console.log(e.target)
            console.log(field)
            console.log(e.target.className)
            e.target.className = e.target.className.split(" ").filter( c => c !== "focus-blue" ).join(" ")
        }
    }

    render(){
        return (
            <figure className="create-channel-modal">
                <section className="head">
                    <h2>Create a{this.state.private ? " private" : ""} channel</h2>
                    <button onClick={ this.handleClose } >
                        <figure className="x" >
                            <span>
                                x
                            </span>
                        </figure>
                    </button>
                </section>
                <p>
                    Channels are how you communicate with friends or groups. Seperate channels cover different interests - like #d&d.
                </p>
                <form onSubmit={ this.handleSubmit }>

                    <label htmlFor="name">Name <br/>
                        <input type="text" id="name"
                            onFocus={ this.handleFocus } 
                            onBlur={ this.handleBlur("name") }
                            placeholder="# &nbsp; e.g. beach-trip" />
                    </label>

                    <label htmlFor="description">Description <span className="opt">(optional)</span> <br/>
                        <input type="text" id="description"
                            onFocus={ this.handleFocus }
                            onBlur={ this.handleBlur("description") } />
                            <br/>
                            <span className="subline">What's this channel about?</span>
                    </label>

                    <label htmlFor="private" className="private">
                        <p>
                            <strong>Make private</strong> <br/>
                            { !this.state.private ? (
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
                            <input type="checkbox" id="private"/>
                            <span className="slider"></span>
                        </label>
                    </label>


                    <button className="not-valid">Create</button>
                </form>
            </figure>
        )
    }
}
export default CreateChannelModal