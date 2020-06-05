import { loginDemo } from "../../actions/session_actions"
import { connect } from "react-redux"
import Splash from "./splash"

const mapStateToProps = ({ session: { currentUserId } }) => (
    {
        loggedIn: Boolean(currentUserId)
    }
)

const mapDispatchToProps = dispatch => (
    {
        loginDemo: history => dispatch(loginDemo(history))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Splash)