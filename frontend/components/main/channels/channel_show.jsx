import React, { Component } from "react";
import MessageForm from "./message_form";
import DefaultAvatarIcon from "../avatar_icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MessageFull from "./message_full";
import MessageStub from "./message_stub";
import { checkSubbed } from "../../../utils/function_helpers";
import MessageAlert from "./message_alert";

class ChannelShow extends Component {

    componentDidMount(){
        this.props.fetchChannelMessages(this.props.pathId)
        this.createChannelSubscription()
    }
    
    componentDidUpdate(prevProps){
        const { props: { pathId }, observer, bottom: { current: bot } } = this
        const { pathId: prevPathId } = prevProps
        if ( pathId !== prevPathId ) {
            this.createChannelSubscription()
        }
        if ( !observer  ) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
                threshold: [0]
            })
            this.observer.observe(bot)
        }
    }

    componentWillUnmount(){
        this.observer.disconnect()
        this.observer = null
    }
    
    createChannelSubscription(){
        const { props: { removeMessage, receiveMessage, pathId, currentUserId }, bottom } = this;
        this.sub = checkSubbed(`c${pathId}`) || App.cable.subscriptions.create(
            { channel: "ChatChannel", channel_id: `c${pathId}` },
            {
                received: data => {
                    if ( data.type === "delete" ) {
                        removeMessage(data)
                    } else {
                        receiveMessage(data).then( authorId => {
                            if ( data.type === "new" ) {
                                if ( authorId === currentUserId ) {
                                    bottom.current.scrollIntoView()
                                } else if ( this.state.scrolled && data.cId === `c${pathId}`) {
                                    this.setState({ newMessages: this.state.newMessages + 1 })
                                }
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
            this.state = {
                newMessages: 0,
                scrolled: false
            }
            this.bottom = React.createRef();
        }
        
        handleIntersect(entries, observer){
            const entry = entries[0]
            if ( entry.isIntersecting ) {
                this.setState({ newMessages: 0, scrolled: false })
            } else {
                this.setState({ scrolled: true })
            }
        }
        
        handleClick(section) {
            return e => {
                e.stopPropagation();
                if (section === "see-new") {
                    this.bottom.current.scrollIntoView()
                } else if ( section === "clear-new" ) {
                    this.setState({ newMessages: 0 })
                }
            }
        }
        
        formatTimeString(time) {
            time = time.toLocaleTimeString().split(":")
            time[2] = time[2].slice(2)
            return `${time[0]}:${time[1]}${time[2]}`
        }
        
        
        render(){

            const { channel, messages, currentUserId } = this.props
            const numMessages = this.state.newMessages

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
                        user={ currentUserId }
                        message={ message }
                        sub={ this.sub }
                        newChannel={ newChannel }
                        time={ this.formatTimeString(time) }
                        />
                        )
                    } else {
                        return (
                            <MessageFull key={ message.id }
                                user={ currentUserId }
                                message={ message }
                                sub={ this.sub }
                                newChannel={ newChannel }
                                time={ this.formatTimeString(time) }
                                username={ message.username || this.props.users[message.author_id].username }
                            />
                        )
                    }
            })

        const messageAlert = numMessages > 0 ? (
            <MessageAlert num={numMessages} handleClick={ this.handleClick.bind(this) }/>
        ) : null
        
        return(
            <div className="show">
                <main className="chat-container">
                    <div className="message-list-container">
                        <div className={ `message-list${ newChannel ? " extra-space" : "" }`}>
                            { messageList }
                            <div className="bottom" ref={this.bottom}></div>
                        </div>
                    </div>
                    { messageAlert }
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
