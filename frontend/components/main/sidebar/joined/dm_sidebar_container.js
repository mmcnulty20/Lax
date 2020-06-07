import { connect } from "react-redux"
import DisplayIndex from "./sidebar_display_index"

const mapStateToProps = ({ entities: { dms } }) => {
    dms = {
        1: {
            id: 1,
            name: "user1",
            owner: true,
        },
        2: {
            id: 2,
            name: "user2",
            owner: true,
        },
        3: {
            id: 3,
            name: "user3",
            owner: true,
        }
    }
    dms = Object.values(dms)
    return {
        type: "Direct messages",
        content: dms,
    }
}

const mapDispatchToProps = dispatch => (
    {
        fetchIndex: () => console.log("fetching DMs"),
        deleteDM: id => console.log(`Deleting DM ${id}`),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(DisplayIndex)