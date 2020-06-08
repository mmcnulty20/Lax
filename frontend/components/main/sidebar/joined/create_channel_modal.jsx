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
            e.target.className = e.target.className.newClass.split(" ").filter( c => c !== "focus-blue" ).join(" ")

        }
    }

    render(){
        return (
            <figure className="create-channel-modal">
                <h2>Create a{this.state.private ? " private" : ""} channel</h2>
                <figure className="x" onClick={ this.handleClose }>
                    x
                </figure>
                <p>
                    Channels are how you can communicate with friends or groups. Seperate channels might cover different topics or interests.
                </p>
                <form onSubmit={ this.handleSubmit }>

                    <label htmlFor="name">Name
                        <input type="text" id="name"
                            onFocus={ this.handleFocus } 
                            onBlur={ this.handleBlur("name") } />
                    </label>

                    <label htmlFor="description">Description <span>(optional)</span>
                        <input type="text" id="description"
                            onFocus={ this.handleFocus }
                            onBlur={ this.handleBlur("description") } />
                    </label>

                    <label htmlFor="private" className="private">
                        <p>
                            <strong>Make Private</strong>
                            { this.state.private ? (
                                <>
                                    When a channel is set to private, it can only be viewed or joined by invitation.
                                </>
                            ) : (
                                <>
                                    <span>This can't be undone.</span> A private channel cannot be made public later on.
                                </>
                             )}
                        </p>
                        <input type="checkbox" id="private"/>
                        <span className="slider"></span>
                    </label>


                    <button className="not-valid">Create</button>
                </form>
            </figure>
        )
    }
}
export default CreateChannelModal