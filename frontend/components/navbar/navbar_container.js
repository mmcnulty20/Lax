import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session_actions'; //temp
import NavBar from './navbar';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ session }, ownProps) => {
    const location = ownProps.location.pathname
    const loggedIn = Boolean(session.currentUserId)
    return {
        loggedIn,
        location
    }
}

const mapDispatchToProps = dispatch => (
    {
        logout: () => dispatch(logoutUser()),
    }
)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));