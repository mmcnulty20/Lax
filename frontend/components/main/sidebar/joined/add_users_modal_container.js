import { connect } from "react-redux"
import AddUsersToChannelModal from "./add_users_to_channel_modal"
import { closeModal } from "../../../../actions/ui_actions"
import { retrieveAllUsers } from "../../../../actions/session_actions"
import { addChannelMembers } from "../../../../actions/channel_actions"
import { withRouter } from "react-router-dom"

const mapStateToProps = ({entities: { users }, session: { currentUserId } }) => {
    users = { ...users }
    delete users[currentUserId]
    return {
        users,
    }
}

const mapDispatchToProps = dispatch => (
    {
        closeModal: () => dispatch(closeModal()),
        retrieveAllUsers: () => dispatch(retrieveAllUsers()),
        addMembers: (channelId, userIds) => dispatch(addChannelMembers(channelId, userIds)),
    }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddUsersToChannelModal))