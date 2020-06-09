import { connect } from "react-redux"
import { closeModal } from "../../../../actions/ui_actions"
import CreateChannelModal from "./create_channel_modal"
import { createChannel, checkName } from "../../../../actions/channel_actions"

const mapStateToProps = ({ errors: { channel } }) => {
    const nameExists = channel[0] ? channel[0].nameExists : false;
    return {
        nameExists,
    }
}

const mapDispatchToProps = dispatch => (
    {
        create: channel => dispatch(createChannel(channel)),
        checkName: name => dispatch(checkName(name)),
        closeModal: () => dispatch(closeModal()),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannelModal)