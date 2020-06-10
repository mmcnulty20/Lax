import { connect } from "react-redux";
import ChannelShow from "./channel_show";
import { withRouter } from "react-router-dom";
import { addChannelMembers } from "../../../actions/channel_actions";

const mapStateToProps = ( { entities: { channels, messages }, session: { currentUserId } }, { location: { pathname } }) => {
    const channel = channels[pathname.slice(3)]
    // messages = messages.filter( m => m.channelId === channel.id )
    messages = [ {id: 1, body: "heres some text"}, { id: 2, body: "and more"} ]
    return {
        channel,
        currentUserId,
        messages
    }
}

const mapDispatchToProps = dispatch => (
    {
        handleJoin: (channel, id) => dispatch(addChannelMembers( channel, id ))
    }
)

const ChannelShowContainer = withRouter(connect(mapStateToProps,mapDispatchToProps)(ChannelShow))

export default ChannelShowContainer;