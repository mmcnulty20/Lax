import { connect } from "react-redux"
import AddUsersToChannelModal from "./add_users_to_channel_modal"
import { closeModal } from "../../../../actions/ui_actions"
import { retrieveAllUsers } from "../../../../actions/session_actions"
import { addChannelMembers } from "../../../../actions/channel_actions"

const mapStateToProps = ({entities: { users } }) => (
    {
        users,
    }
)

const mapDispatchToProps = dispatch => (
    {
        closeModal: () => dispatch(closeModal()),
        retrieveAllUsers: () => dispatch(retrieveAllUsers()),
        addMembers: userIds => dispatch(addChannelMembers(userIds)),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(AddUsersToChannelModal)