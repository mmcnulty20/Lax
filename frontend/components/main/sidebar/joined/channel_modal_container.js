import { connect } from "react-redux"
import { closeModal } from "../../../../actions/ui_actions"
import CreateChannelModal from "./create_channel_modal"
import { createChannel } from "../../../../actions/channel_actions"

// const mapStateToProps = (state) => {
//     return {
//         // errors
//     }
// }

const mapDispatchToProps = dispatch => (
    {
        create: channel => dispatch(createChannel(channel)),
        closeModal: () => dispatch(closeModal()),
    }
)

export default connect(null, mapDispatchToProps)(CreateChannelModal)