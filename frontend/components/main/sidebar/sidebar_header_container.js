import { connect } from "react-redux";
import SidebarHeader from "./sidebar_header";

const mapStateToProps = ({ entities: { users }, session: { currentUserId } }) => {
    const currentUser = users[currentUserId]
    return {
        currentUser,
    }
}

export default connect(mapStateToProps,null)(SidebarHeader);