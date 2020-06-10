import { connect } from "react-redux"
import DisplayIndex from "./sidebar_display_index"
import { fetchUserChannels,
            fetchAllChannels,
            deleteChannel } from "../../../../actions/channel_actions"
import { openModal } from "../../../../actions/ui_actions"
import { withRouter } from "react-router-dom"

const mapStateToProps = ({ entities: { channels }, session: { currentUserId }, ui: { modal } }) => {
    channels = { ...channels }
    delete channels["search"]
    channels = Object.values(channels).filter( c => !c.members || c.members.includes(currentUserId) )
    return {
        type: "Channels",
        content: channels,
        currentUserId,
        modal,
    }
}

const mapDispatchToProps = dispatch => (
    {
        fetchIndex: id => dispatch(fetchUserChannels(id)),
        fetchAllChannels: () => dispatch(fetchAllChannels()),
        delete: id => dispatch(deleteChannel(id)),
        openModal: () => dispatch(openModal()),
    }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayIndex))