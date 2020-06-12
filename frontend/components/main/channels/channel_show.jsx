import React, { Component } from "react";
import MessageForm from "./message_form";
import DefaultAvatarIcon from "../avatar_icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MessageFull from "./message_full";
import MessageStub from "./message_stub";

class ChannelShow extends Component {

    componentDidMount(){

        this.props.fetchChannelMessages(this.props.pathId)
        this.createChannelSubscription()
    }

    componentDidUpdate(prevProps) {
        if ( JSON.stringify(prevProps.messages) !== JSON.stringify(this.props.messages) ) this.setState({ messages: Object.values(this.props.messages) }) 
        if ( this.props.pathId !== prevProps.pathId ) {
            this.props.fetchChannelMessages(this.props.pathId).then( this.setState({ messages: Object.values(this.props.messages) }) )
            this.createChannelSubscription()
        }
        if ( this.bottom.current ) this.bottom.current.scrollIntoView();
    }

    createChannelSubscription(){
        this.chatChannel = App.cable.subscriptions.create(
            { channel: "ChatChannel", channel_id: this.props.pathId },
            {
                received: data => {
                    if ( data.message.type === "delete" ) {
                        let messages = this.state.messages.filter( m => m.id !== data.message.id )
                        this.setState({ messages })
                    } else if ( data.message.edited === false ) {
                        this.setState({
                            messages: [ ...this.state.messages, data.message ]
                        })
                    } else if ( data.message.edited === true ) {
                        let messages = this.state.messages.map( (m,i) => {
                            return m.id === data.message.id ?
                                data.message :
                                m
                        })
                        this.setState({ messages })
                    }
                },
                speak: function(data) {
                    return this.perform("speak", data);
                }
            }
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            messages: Object.values(this.props.messages),
        }
        this.bottom = React.createRef();
    }

    formatTimeString(time) {
        time = time.toLocaleTimeString().split(":")
        time[2] = time[2].slice(2)
        return `${time[0]}:${time[1]}${time[2]}`
    }


    render(){
        const { channel, currentUserId } = this.props
        const messages = this.state.messages
        const newChannel = channel && channel.members && !channel.members.includes(currentUserId)

        let prevTime = null
        const messageList = messages.map( (message, i) => {
            const prevMessage = messages[i-1]
            const time = new Date( message.created_at )
            if (prevMessage) prevTime = new Date(prevMessage.created_at)
            if ( !!prevMessage && ( message.author_id === prevMessage.author_id ) &&
                ( ((( time - prevTime ) / 1000 ) / 60) < 3 ) ) {
                    return ( 
                        <MessageStub key={ message.id }
                            chatChannel={ this.chatChannel }
                            user={ currentUserId }
                            message={ message }
                            newChannel={ newChannel }
                            time={ this.formatTimeString(time) }
                            ref={ this.bottom } />
                    )
            } else {
                return (
                    <MessageFull key={ message.id }
                        chatChannel={ this.chatChannel }
                        user={ currentUserId }
                        message={ message }
                        newChannel={ newChannel }
                        time={ this.formatTimeString(time) }
                        username={ message.username || this.props.users[message.author_id].username }
                        ref={ this.bottom } />
            )}
        })

        return(
            <div className="show">
                <main className="chat-container">
                    <div className={ `message-list${ newChannel ? " extra-space" : "" }`}>
                        { messageList }
                    </div>
                    </main>
                { newChannel ? (
                    <footer className="new-channel">
                        <div>
                            <h1>You are viewing 
                            <FontAwesomeIcon icon="hashtag"/>
                                <strong>{channel.name}</strong>
                            </h1>
                            <button onClick={ () => this.props.handleJoin( channel.id, [currentUserId] ) }>
                                Join Channel
                            </button>
                        </div>
                    </footer>
                ) : channel ? (
                    <MessageForm
                        chatChannel={ this.chatChannel }
                        edit={ false }
                        user={ currentUserId }
                        channelId={ channel.id }
                        private={ channel.isPrivate }
                        name={ channel.name } />
                ) : null }
            </div>
        )
    }
}

export default ChannelShow;
