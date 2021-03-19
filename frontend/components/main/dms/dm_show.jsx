import React, { Component } from "react";

import DefaultAvatarIcon from "../avatar_icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { fetchDirectMessages } from "../../../actions/message_actions";
import MessageForm from "../channels/message_form";
import MessageStub from "../channels/message_stub";
import { connect } from "react-redux";
import MessageFull from "../channels/message_full";

class DMShow extends Component {

    componentDidMount() {
        this.props.fetchDirectMessages(this.props.pathId)
        this.createChannelSubscription()
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.messages) !== JSON.stringify(this.props.messages)) this.setState({ messages: Object.values(this.props.messages) })
        if (this.props.pathId !== prevProps.pathId) {
            this.props.fetchDirectMessages(this.props.pathId).then(this.setState({ messages: Object.values(this.props.messages) }))
            this.createChannelSubscription()
        }
        if (this.bottom.current) this.bottom.current.scrollIntoView();
    }

    createChannelSubscription() {
        App.cable.subscriptions.create(
            { channel: "ChatChannel", dm_id: this.props.pathId },
            {
                received: data => {
                    if (data.message.type === "delete") {
                        let messages = this.state.messages.filter(m => m.id !== data.message.id)
                        this.setState({ messages })
                    } else if (data.message.edited === false) {
                        this.setState({
                            messages: [...this.state.messages, data.message]
                        })
                    } else if (data.message.edited === true) {
                        let messages = this.state.messages.map((m, i) => {
                            return m.id === data.message.id ?
                                data.message :
                                m
                        })
                        this.setState({ messages })
                    }
                },
                speak: function (data) {
                    return this.perform("speak", data);
                }
            }
        )
        if (App.cable.subscriptions.subscriptions.length > 1) App.cable.subscriptions.subscriptions.shift()
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


    render() {
        const { dm, currentUserId, users } = this.props
        const messages = this.state.messages
        const name = dm ? ( dm.members.filter(i => i != currentUserId)
            .map(memberId => users[memberId].username).join(", ") ) : null
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
                        time={this.formatTimeString(time)}
                        ref={this.bottom} />
                )
            } else {
                return (
                    <MessageFull key={message.id}
                        user={currentUserId}
                        message={message}
                        time={this.formatTimeString(time)}
                        username={message.username || this.props.users[message.author_id].username}
                        ref={this.bottom} />
                )
            }
        })

        return (
            <div className="show">
                <main className="chat-container">
                    <div className="message-list-container">
                        <div className="message-list">
                            {messageList}
                        </div>
                    </div>
                </main>
                {dm ? (
                    <MessageForm
                        edit={false}
                        user={currentUserId}
                        type="DM"
                        id={dm.id}
                        name={name} />
                ) : null}
            </div>
        )
    }
}

const mStP = ({ entities: { dms, messages, users }, session: { currentUserId } }, { location: { pathname } }) => {
    const pathId = pathname.slice(3)
    const dm = dms[pathId]
    messages = messages[`d${pathId}`] || {}
    return {
        users,
        pathId,
        dm,
        currentUserId,
        messages
    }
}

const mDtP = dispatch => ({
    fetchDirectMessages: dmId => dispatch(fetchDirectMessages(dmId)),
    fetchNewMessage: messageId => dispatch(fetchNewMessage(messageId))
})

export default connect(mStP, mDtP)(DMShow);