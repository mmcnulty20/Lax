import React, { Component } from "react";
import MessageForm from "./message_form";
import DefaultAvatarIcon from "../avatar_icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MessageFull from "./message_full";
import MessageStub from "./message_stub";
import { checkSubbed } from "../../../utils/function_helpers";

class ChannelShow extends Component {

    componentDidMount(){
        this.props.fetchChannelMessages(this.props.pathId)
        this.createChannelSubscription()
    }

    componentDidUpdate(prevProps){
        const { pathId, messages } = this.props
        const { pathId: prevPathId, messages: prevMessages } = prevProps
        if ( pathId !== prevPathId ) {
            this.createChannelSubscription()
        }
    }
    
    createChannelSubscription(){
        const { receiveMessage, pathId, currentUserId } = this.props;
        this.sub = checkSubbed(`c${pathId}`) || App.cable.subscriptions.create(
            { channel: "ChatChannel", channel_id: `c${pathId}` },
            {
                received: data => {
                    if ( data.type === "delete" ) {
                    } else {
                        receiveMessage(data).then( authorId => {
                            if ( data.type === "new" && authorId === currentUserId ) {
                                this.bottom.current.scrollIntoView()
                            }
                        })
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
        this.bottom = React.createRef();
    }

    formatTimeString(time) {
        time = time.toLocaleTimeString().split(":")
        time[2] = time[2].slice(2)
        return `${time[0]}:${time[1]}${time[2]}`
    }


    render(){
        const { channel, messages, currentUserId } = this.props
        const newChannel = channel && channel.members && !channel.members.includes(currentUserId)
        if (!channel || messages.length === 0) { return null }
        let prevTime = null
        const messageList = messages.map( (message, i) => {
            const prevMessage = messages[i-1]
            const time = new Date( message.created_at )
            if (prevMessage) prevTime = new Date(prevMessage.created_at)
            if ( !!prevMessage && ( message.author_id === prevMessage.author_id ) &&
                ( ((( time - prevTime ) / 1000 ) / 60) < 3 ) ) {
                    return ( 
                        <MessageStub key={ message.id }
                            user={ currentUserId }
                            message={ message }
                            newChannel={ newChannel }
                            time={ this.formatTimeString(time) }
                            ref={ this.bottom } />
                    )
            } else {
                return (
                    <MessageFull key={ message.id }
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
                    <div className="message-list-container">
                        <div className={ `message-list${ newChannel ? " extra-space" : "" }`}>
                            { messageList }
                        </div>
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
                        edit={ false }
                        user={ currentUserId }
                        id={ channel.id }
                        sub={ this.sub }
                        type="Channel"
                        private={ channel.isPrivate }
                        name={ channel.name } />
                ) : null }
            </div>
        )
    }
}

export default ChannelShow;
