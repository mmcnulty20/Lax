import React, { Component } from "react";

import DefaultAvatarIcon from "../avatar_icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

import { receiveMessage, removeMessage } from "../../../actions/message_actions";
import { fetchDM } from "../../../actions/dm_actions";
import { checkSubbed } from "../../../utils/function_helpers";
import MessageForm from "../channels/message_form";
import MessageStub from "../channels/message_stub";
import MessageFull from "../channels/message_full";
import MessageAlert from "../channels/message_alert";

class DMShow extends Component {

    componentDidMount() {
        this.props.fetchDirectMessages(this.props.pathId)
        this.createChannelSubscription()
    }

    componentDidUpdate(prevProps) {
        const { props: { pathId }, observer, bottom: { current: bot } } = this
        const { pathId: prevPathId } = prevProps
        if ( pathId !== prevPathId ) {
            this.props.fetchDirectMessages(pathId)
            this.createChannelSubscription()
        }
        if (!observer) {
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
                threshold: [0]
            })
            this.observer.observe(bot)
        }
    }

    componentWillUnmount(){
        this.observer.disconnect()
        this.observer = null;
    }

    createChannelSubscription(){
        const { props: { removeMessage, receiveMessage, pathId, currentUserId }, bottom: { current: botRef } } = this;
        this.sub = checkSubbed(`d${pathId}`) || App.cable.subscriptions.create(
            { channel: "ChatChannel", dm_id: `d${pathId}` },
            {
                received: data => {
                    if (data.type === "delete" ) {
                        removeMessage(data)
                    } else {
                        receiveMessage(data).then( authorId => {
                            if ( data.type === "new" ) {
                                if ( authorId === currentUserId && botRef ) {
                                    botRef.scrollIntoView()
                                } else if ( this.state.scrolled && data.cId === `d${pathId}`) {
                                    this.setState({ newMessages: this.state.newMessages + 1 })
                                }
                            }
                        })
                    }
                },
                speak: function (data) {
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
        if (entry.isIntersecting) {
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


    render() {

        const { dm, messages, currentUserId, users } = this.props
        const numMessages = this.state.newMessages
        const name = dm ? ( dm.members.filter(i => i !== currentUserId)
            .map(memberId => users[memberId] ? users[memberId].username : "").join(", ") ) : null

        let prevTime = null
        const messageList = messages.map((message, i) => {
            const prevMessage = messages[i - 1]
            const time = new Date(message.created_at)
            if (prevMessage) prevTime = new Date(prevMessage.created_at)
            if (!!prevMessage && (message.author_id === prevMessage.author_id) &&
                ((((time - prevTime) / 1000) / 60) < 3)) {
                return (
                    <MessageStub key={message.id}
                        user={currentUserId}
                        message={message}
                        sub={this.sub}
                        time={this.formatTimeString(time)}
                    />
                )
            } else {
                return ( 
                    <MessageFull key={message.id}
                        user={currentUserId}
                        message={message}
                        sub={this.sub}
                        time={this.formatTimeString(time)}
                        username={message.username || (this.props.users[message.author_id]) ? this.props.users[message.author_id].username : "" }
                    />
                )
            }
        })

        const messageAlert = numMessages > 0 ? (
            <MessageAlert num={numMessages} handleClick={ this.handleClick.bind(this) }/>
        ) : null

        return (
            <div className="show">
                <main className="chat-container">
                    <div className="message-list-container">
                        <div className="message-list">
                            {messageList}
                            <div className="bottom" ref={this.bottom}></div>
                        </div>
                    </div>
                    { messageAlert }
                </main>
                {dm ? (
                    <MessageForm
                        edit={false}
                        user={currentUserId}
                        type="DM"
                        id={dm.id}
                        sub={this.sub}
                        name={name} />
                ) : null}
            </div>
        )
    }
}

const mStP = ({ entities: { dms, messages, users }, session: { currentUserId } }, { location: { pathname } }) => {
    const pathId = pathname.slice(3)
    const dm = dms[pathId]
    messages = Object.values(messages[`d${pathId}`] || {} )
    return {
        users,
        pathId,
        dm,
        currentUserId,
        messages
    }
}

const mDtP = dispatch => ({
    fetchDirectMessages: dmId => dispatch(fetchDM(dmId)),
    fetchNewMessage: messageId => dispatch(fetchNewMessage(messageId)),
    removeMessage: message => dispatch(removeMessage( message )),
    receiveMessage: message => {
        return new Promise( (res, rej) => {
            dispatch(receiveMessage(message))
            res(message.message.author_id);
        })
    },
})

export default connect(mStP, mDtP)(DMShow);