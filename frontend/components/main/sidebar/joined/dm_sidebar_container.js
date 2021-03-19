import { connect } from "react-redux"
import { withRouter } from "react-router"
import DisplayIndex from "./sidebar_display_index"

const mapStateToProps = ({ entities: { dms, users }, session: { currentUserId } }) => {
    // debugger
    // dms = {
    //     1: {
    //         id: 1,
    //         name: "user1",
    //         owner: true,
    //     },
    //     2: {
    //         id: 2,
    //         name: "user2",
    //         owner: true,
    //     },
    //     3: {
    //         id: 3,
    //         name: "user3",
    //         owner: true,
    //     }
    // }
    dms = Object.values(dms).map ( dm => {
        let name = dm.members.filter( i => i != currentUserId)
        let quantity = ""
        if ( name.length > 1 ) {
            quantity = `(${ name.length }) `
        }
        name = quantity + name.map( memberId => users[memberId].username ).join(", ")
        return { id: dm.id, name }
    } )
    return {
        type: "Direct Messages",
        content: dms
    }
}

const mapDispatchToProps = dispatch => (
    {
        fetchIndex: () => null,
        delete: id => null,
    }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayIndex))