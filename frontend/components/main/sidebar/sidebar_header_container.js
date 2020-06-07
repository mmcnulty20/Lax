import { connect } from "react-redux";
import SidebarHeader from "./sidebar_header";
import { logoutUser } from "../../../actions/session_actions";

const mapStateToProps = ({ entities: { users }, session: { currentUserId } }) => {
    const currentUser = users[currentUserId]
    return {
        currentUser,
    }
}

const mapDispatchToProps = dispatch => (
    {
        logout: () => dispatch(logoutUser()),
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(SidebarHeader);