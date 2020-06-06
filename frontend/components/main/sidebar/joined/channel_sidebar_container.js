import { connect } from "react-redux"
import DisplayIndex from "./sidebar_display_index"

const mapStateToProps = ({ entities: { channels } }) => {
    channels = {
        1: {
            id: 1,
            name: "test1",
            isPrivate: false,
        },
        2: {
            id: 2,
            name: "test2",
            isPrivate: false,
        },
        3: {
            id: 3,
            name: "test3",
            isPrivate: true,
        }
    }
    channels = Object.values(channels)
    return {
        type: "Channels",
        content: channels,
    }
}

const mapDispatchToProps = dispatch => (
    {
        fetchIndex: () => null,
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(DisplayIndex)