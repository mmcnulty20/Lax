import { connect } from "react-redux"
import AddUsersToChannelModal from "./add_users_to_channel_modal"
import { closeModal } from "../../../../actions/ui_actions"
import { retrieveAllUsers } from "../../../../actions/session_actions"

const mapStateToProps = ({entities: { users } }) => (
    {
        users,
    }
)

const mapDispatchToProps = dispatch => (
    {
        closeModal: () => dispatch(closeModal()),
        retrieveAllUsers: () => dispatch(retrieveAllUsers())
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(AddUsersToChannelModal)