import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MessageForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            body: "",
        }
        this.icon = props.private ? "\f023" : "\f292"
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(field){
        return e => this.setState({ [field]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(App)
        App.cable.subscriptions.subscriptions[0].speak({ message: this.state.body })
        this.setState({ body: "" })
    }

    render(){
        return(
            <section className="message-form">
                <form onSubmit={ this.handleSubmit } >
                    <div className="input" >
                        <input type="text"
                            value={ this.state.body }
                            onChange={ this.handleChange("body") }
                            placeholder="temp" />
                        { /*this.state.body.length > 0 */ true ? null : (
                            <div className="placeholder">
                                Message <span>{this.icon}</span>{this.props.name}
                            </div>
                        ) }
                    </div>
                    <button>
                        <FontAwesomeIcon icon="paper-plane" />
                    </button>
                </form>
            </section>
        )
    }

}

export default MessageForm;