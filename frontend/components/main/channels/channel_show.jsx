import React, { Component } from "react";
import MessageForm from "./message_form";

class ChannelShow extends Component {

    componentDidMount(){
        console.log(App)
        console.log(App.cable)
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
        console.log(App.cable.subscriptions)
    }

    componentDidUpdate() {
        console.log(this.bottom)
        if ( this.bottom.current ) this.bottom.current.scrollIntoView();
    }

    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages,
        }
        this.bottom = React.createRef();
    }

    render(){
        const { channel, currentUserId } = this.props
        const newChannel = channel && channel.members && !channel.members.includes(currentUserId)

        const messageList = this.state.messages.map( m => { 
            const listItem = (
            <li key={ m.id }>
                { m.body }
                <div ref={ this.bottom } />
            </li>
        )
        console.log(listItem)
        return listItem
            })
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