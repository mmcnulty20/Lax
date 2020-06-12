import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MessageForm extends Component {
    componentDidUpdate(oldProps) {
        if ( this.props.channelId !== oldProps.channelId ) this.icon = this.props.private ? "lock" : "hash"
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
        this.icon = props.private ? "lock" : "hash"

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.handleEnter = this.handleEnter.bind(this)
    }

    handleChange(target){
        target.style.height = "20px";
        target.style.height = `${target.scrollHeight}px`;
        this.setState({ body: target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        const message = {
            body: this.state.body,
            edit: this.props.edit,
        }
        if ( !this.props.edit ) {
            message.authorId = this.props.user
            message.channelId = this.props.channelId
        } else {
            message.messageId = this.props.messageId
        }
        this.props.chatChannel.speak({ message })
        if (this.props.edit) { 
            e.persist();
            this.props.handleEditEnd(e)
        } else {
            e.target.style.height = "20px"
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
                <form onSubmit={ this.handleSubmit } >
                    <div className="input" onClick={ () => this.divRef.current.focus() }>
                        { ( this.props.edit || this.state.body.length > 0 ) ? null : (
                            <div className={ `placeholder ${ this.icon }`}>
                                Message &nbsp;&nbsp;&nbsp;&nbsp; {this.props.name}
                            </div>
                        ) }
                        <textarea
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
            </section>
        )
    }

}

export default MessageForm;