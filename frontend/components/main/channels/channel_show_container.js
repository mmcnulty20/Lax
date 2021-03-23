import { connect } from "react-redux";
import ChannelShow from "./channel_show";
import { withRouter } from "react-router-dom";
import { addChannelMembers } from "../../../actions/channel_actions";
import { fetchChannelMessages, fetchNewMessage, receiveMessage, removeMessage } from "../../../actions/message_actions";

const mapStateToProps = ( { entities: { channels, messages, users }, session: { currentUserId } }, { location: { pathname } }) => {
    const pathId = pathname.slice(3)
    const channel = channels[pathId]
    messages = Object.values(messages[`c${pathId}`] || {} )
    return {
        users,
        pathId,
        channel,
        currentUserId,
        messages
    }
}

const mapDispatchToProps = dispatch => (
    {
        handleJoin: (channel, id) => dispatch(addChannelMembers( channel, id )),
        fetchChannelMessages: channelId => dispatch(fetchChannelMessages(channelId)),
        fetchNewMessage: messageId => dispatch(fetchNewMessage(messageId)),
        removeMessage: message => dispatch(removeMessage( message )),
        receiveMessage: message => {
            return new Promise( (res, rej) => {
                dispatch(receiveMessage(message))
                res(message.message.author_id);
            })
        },
    }
)

const ChannelShowContainer = withRouter(connect(mapStateToProps,mapDispatchToProps)(ChannelShow))

export default ChannelShowContainer;
