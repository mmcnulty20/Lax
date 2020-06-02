import { connect } from 'react-redux';
import { loginUser } from '../../actions/session_actions';
import AuthForm from './auth_form';

const mapStateToProps = state => {
    const user = { username: "", password: "" }
    const errors = [].concat(...Object.values(state.errors))
    return {
        placeholders: false,
        user,
        errors,
        formType: 'Sign In'
    }
}

const mapDispatchToProps = dispatch => {
    return {
        processForm: user => dispatch(loginUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);