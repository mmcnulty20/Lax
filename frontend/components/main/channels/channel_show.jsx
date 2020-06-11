import React, { Component } from "react";
import MessageForm from "./message_form";
import DefaultAvatarIcon from "../avatar_icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ChannelShow extends Component {

    componentDidMount(){

        this.props.fetchChannelMessages(this.props.pathId)
        App.cable.subscriptions.create(
            { channel: "ChatChannel" },
            {
                received: data => {
                    console.log(data.message)
                    if ( data.message.channelId == this.props.pathId ) {
                        this.setState({
                            messages: [ ...this.state.messages, data.message ]
                        })
                    }
                },
                speak: function(data) {
                    return this.perform("speak", data);
                }
            }
        )
    }

    componentDidUpdate(prevProps) {
        if ( JSON.stringify(prevProps.messages) !== JSON.stringify(this.props.messages) ) this.setState({ messages: Object.values(this.props.messages) }) 
        if ( this.props.pathId !== prevProps.pathId ) this.props.fetchChannelMessages(this.props.pathId).then( this.setState({ messages: Object.values(this.props.messages) }) )
        if ( this.bottom.current ) this.bottom.current.scrollIntoView();
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
        const newChannel = channel && channel.members && !channel.members.includes(currentUserId)
        const messageList = this.state.messages.map( m => {
            console.log(m)
            console.log(this.props)
            return(
            <li key={ m.id } className={ newChannel ? "extra-space" : "" }>
                <DefaultAvatarIcon username={ m.username } />
                <div className="message-details">
                    <h3> { m.username || this.props.users[m.author_id].username } <span> { this.formatTimeString(new Date(m.created_at)) } </span> </h3>
                    <p>
                        { m.body }
                        { m.edited ? <span>(edited)</span> : null }
                    </p>
                </div>
                <div ref={ this.bottom } />
            </li>
        )})
        if ( newChannel ) console.log(messageList[messageList.length - 1])
        return(
            <div className="show">
                <main className="chat-container">
                    <div className="message-list">
                        { messageList }
                    </div>
                    </main>
                { newChannel ? (
                    <footer className="new-channel">
                        <div>
                            <FontAwesomeIcon icon="hashtag"/>
                            <h1>You are viewing <strong>{channel.name}</strong> </h1>
                            <button onClick={ () => this.props.handleJoin( channel.id, [currentUserId] ) }>
                                Join Channel
                            </button>
                        </div>
                    </footer>
                ) : channel ? (
                    <MessageForm
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