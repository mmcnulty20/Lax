import { connect } from "react-redux"
import DisplayIndex from "./sidebar_display_index"
import { fetchUserChannels,
            fetchAllChannels,
            createChannel,
            deleteChannel } from "../../../../actions/channel_actions"
import { closeModal, openModal } from "../../../../actions/ui_actions"

const mapStateToProps = ({ entities: { channels }, session: { currentUserId }, ui: { modal } }) => {
    channels = Object.values(channels)
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
        createChannel: channel => dispatch(createChannel(channel)),
        deleteChannel: id => dispatch(deleteChannel(id)),
        closeModal: () => dispatch(closeModal()),
        openModal: () => dispatch(openModal()),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(DisplayIndex)