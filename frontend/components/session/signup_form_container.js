import { connect } from 'react-redux';
import { signupUser, loginDemo, purgeErrors } from '../../actions/session_actions';
import AuthForm from './auth_form';

const mapStateToProps = state => {
    const user = { username: "", email: "", password: "" }
    const errors = [].concat(...Object.values(state.errors))
    return {
        user,
        errors,
        formType: 'Create Account'
    }
}

const mapDispatchToProps = dispatch => {
    return {
        processForm: user => dispatch(signupUser(user)),
        loginDemo: () => dispatch(loginDemo()),
        purgeErrors: () => dispatch(purgeErrors()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
