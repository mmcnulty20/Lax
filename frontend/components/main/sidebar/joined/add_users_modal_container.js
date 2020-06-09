import { connect } from "react-redux"
import AddUsersToChannelModal from "./add_users_to_channel_modal"
import { closeModal } from "../../../../actions/ui_actions"

const mapStateToProps = (state) => (
    {
        users: [
            { id: 1, username: "Demo", email: "real1@email.com" },
            { id: 2, username: "George", email: "real2@email.com" },
            { id: 3, username: "fred", email: "real3@email.com" },
            { id: 4, username: "hello", email: "real4@email.com" },
            { id: 5, username: "testing", email: "real5@email.com" },
            { id: 6, username: "really", email: "real6@email.com" },
            { id: 7, username: "exciting", email: "real7@email.com" },
            { id: 8, username: "lol", email: "real8@email.com" },
        ]
    }
)

const mapDispatchToProps = dispatch => (
    {
        closeModal: () => dispatch(closeModal()),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(AddUsersToChannelModal)