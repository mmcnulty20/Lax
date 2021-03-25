import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MessageForm extends Component {
    componentDidUpdate(oldProps) {
        if (this.props.id !== oldProps.id || this.props.type !== oldProps.type ) this.icon = this.props.type === "Channel" ? (this.props.private ? "lock" : "hash") : ""
    }

    componentDidMount(){
        this.handleChange(this.divRef.current)
    }

    constructor(props) {
        super(props)
        this.divRef = React.createRef();
        this.state = {
            body: props.body || "",
        }
        this.icon = props.type === "Channel" ? ( props.private ? "lock" : "hash" ) : ""

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.handleEnter = this.handleEnter.bind(this)
    }

    handleChange(target){
        target.style.height = "20px";
        
        target.style.height = `${target.scrollHeight}px`;

        this.messageForm = target.parentElement.parentElement.parentElement

        let formHeight = (target.scrollHeight + 65) < 399 ? (target.scrollHeight + 65) : 399
        this.messageForm.style.maxHeight = `${formHeight}px`;

        this.setState({ body: target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        const message = {
            body: this.state.body,
            edit: this.props.edit,
            type: this.props.type
        }
        if ( !this.props.edit ) {
            message.authorId = this.props.user
            message.channelId = this.props.id
        } else {
            message.messageId = this.props.messageId
        }
        this.props.sub.speak({ message })
        if (this.props.edit) { 
            e.persist();
            this.props.handleEditEnd(e)
        } else {
            e.target.style.height = "20px"
            this.messageForm.style.maxHeight = "83px"
            this.setState({ body: "" })
        }
    }

    handleEnter(e){
        if ( e.keyCode == 13 && e.shiftKey === false ) {
            e.persist();
            this.handleSubmit(e)
        }
    }

    render(){
        return(

            <section className={ `message-form` + ( this.props.edit ? " edit" : "" ) }>
                {/* <section className="form-container"> */}
                <form onSubmit={ this.handleSubmit } >
                    <div className="input" onClick={ () => this.divRef.current.focus() }>
                        { ( this.props.edit || this.state.body.length > 0 ) ? null : (
                            <div className={ `placeholder ${ this.icon }`}>
                                Message <span className={ this.props.type === "Channel" ? "space" : "" }></span> {this.props.name}
                                {/* Message &nbsp;&nbsp;&nbsp;&nbsp; {this.props.name} */}
                            </div>
                        ) }
                        <textarea
                            onFocus={ this.props.setFocused }
                            id="input"
                            autoFocus={ this.props.edit }
                            ref={ this.divRef }
                            onChange={ e => this.handleChange(e.target) }
                            onKeyDown={ this.handleEnter }
                            value={ this.state.body } >
                            { this.state.body }
                        </textarea>
                    </div>
                    { this.props.edit ? (
                        <>
                            <button 
                                onClick={ e => this.props.handleEditEnd(e) }
                                className="cancel" >
                                Cancel
                            </button>
                            <button className="save">
                                <FontAwesomeIcon icon="level-down-alt" />
                                <span>
                                    Save Changes
                                </span>
                            </button>
                        </>
                    ) : (
                        <button
                            disabled={ this.state.body.length === 0 }
                            className={ this.state.body.length > 0 ? "valid" : "" }>
                            <FontAwesomeIcon icon="paper-plane" />
                        </button>
                    ) }
                </form>
                <div className="bottom-space" />
                {/* </section> */}
            </section>
        )
    }

}

export default MessageForm;