import { connect } from 'react-redux';
import NavBarItem from './navbar_item';
import { logoutUser } from '../../actions/session_actions';

const mapStateToProps = ({entities: { users }, session: { currentUserId }}) => {
    const currentUser = users[currentUserId];
    return {
        currentUser,
    }
}

const mapDispatchToProps = dispatch => (
    {
        logout: () => dispatch(logoutUser())
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(NavBarItem);