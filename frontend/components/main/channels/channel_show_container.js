import { connect } from "react-redux";
import ChannelShow from "./channel_show";
import { withRouter } from "react-router-dom";
import { addChannelMembers } from "../../../actions/channel_actions";
import { fetchChannelMessages, fetchNewMessage, receiveMessage } from "../../../actions/message_actions";

const mapStateToProps = ( { entities: { channels, messages, users }, session: { currentUserId } }, { location: { pathname } }) => {
    const pathId = pathname.slice(3)
    const channel = channels[pathId]
    messages = messages[`c${pathId}`] || {}
    debugger
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
        receiveMessage: message => dispatch(receiveMessage(message)),
    }
)

const ChannelShowContainer = withRouter(connect(mapStateToProps,mapDispatchToProps)(ChannelShow))

export default ChannelShowContainer;
