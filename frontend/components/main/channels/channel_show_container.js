import { connect } from "react-redux";
import ChannelShow from "./channel_show";
import { withRouter } from "react-router-dom";
import { addChannelMembers } from "../../../actions/channel_actions";

const mapStateToProps = ( { entities: { channels }, session: { currentUserId } }, { location: { pathname } }) => {
    const channel = channels[pathname.slice(3)]
    return {
        channel,
        currentUserId
    }
}

const mapDispatchToProps = dispatch => (
    {
        handleJoin: (channel, id) => dispatch(addChannelMembers( channel, id ))
    }
)

const ChannelShowContainer = withRouter(connect(mapStateToProps,mapDispatchToProps)(ChannelShow))

export default ChannelShowContainer;