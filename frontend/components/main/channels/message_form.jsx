import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MessageForm extends Component {
    componentDidUpdate(oldProps) {
        if ( this.props.channelId !== oldProps.channelId ) this.icon = this.props.private ? "lock" : "hash"
    }

    constructor(props) {
        super(props)
        this.divRef = React.createRef();
        this.state = {
            body: "",
        }
        this.icon = props.private ? "lock" : "hash"
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(field){
        return e => this.setState({ [field]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        App.cable.subscriptions.subscriptions[0].speak({ message: { body: this.state.body, authorId: this.props.user, channelId: this.props.channelId }})
        this.setState({ body: "" })
    }

    render(){
        return(
            <section className="message-form">
                <form onSubmit={ this.handleSubmit } >
                    <div className="input" onClick={ () => this.divRef.current.focus() }>
                        { this.state.body.length > 0 ? null : (
                            <div className={`placeholder ${ this.icon }`}>
                                Message &nbsp;&nbsp;&nbsp;&nbsp; {this.props.name}
                            </div>
                        ) }
                        <input type="text"
                            ref={ this.divRef }
                            value={ this.state.body }
                            onChange={ this.handleChange("body") }
                            placeholder="" />

                    </div>
                    <button
                        disabled={ this.state.body.length === 0 }
                        className={ this.state.body.length > 0 ? "valid" : "" }>
                        <FontAwesomeIcon icon="paper-plane" />
                    </button>
                </form>
            </section>
        )
    }

}

export default MessageForm;