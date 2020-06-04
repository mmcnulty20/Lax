import { loginDemo } from "../../actions/session_actions"
import { connect } from "react-redux"
import Splash from "./splash"

const mapDispatchToProps = dispatch => (
    {
        loginDemo: () => dispatch(loginDemo())
    }
)

export default connect(null, mapDispatchToProps)(Splash)