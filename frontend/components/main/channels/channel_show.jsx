import React, { Component } from "react";
import MessageForm from "./message_form";

class ChannelShow extends Component {

    componentDidMount(){

        this.props.fetchChannelMessages(this.props.pathId)

        App.cable.subscriptions.create(
            { channel: "ChatChannel" },
            {
                received: data => {
                    this.setState({
                        messages: [ ...this.state.messages, data.message ]
                    })
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

    render(){
        const { channel, currentUserId } = this.props
        const newChannel = channel && channel.members && !channel.members.includes(currentUserId)
        console.log(this.state.messages)
        const messageList = this.state.messages.map( m => (
            <li key={ m.id }>
                { m.body }
                <div ref={ this.bottom } />
            </li>
        ))
        console.log(messageList)
        return(
            <div className="show">
                <main className="chat-container">
                    <div className="message-list">
                        { messageList }
                    </div>
                    { channel ? (
                        <MessageForm
                            channelId={ channel.id }
                            private={ channel.isPrivate }
                            name={ channel.name } />
                    ) : null }
                </main>
                { newChannel ? (
                    <footer className="new-channel">
                        <div>
                            <h1>You are viewing {channel.name} </h1>
                            <button onClick={ () => this.props.handleJoin( channel.id, [currentUserId] ) }>
                                Join Channel
                            </button>
                        </div>
                    </footer>
                ) : null }
            </div>
        )
    }
}

export default ChannelShow;