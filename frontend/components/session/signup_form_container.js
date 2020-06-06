import { connect } from 'react-redux';
import { signupUser, loginDemo, purgeErrors, checkEmail } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mapStateToProps = state => {
    const user = { username: "", email: "", password: "" }
    const errors = [].concat(...Object.values(state.errors))
    const emailExists = state.session.emailExists
    return {
        emailExists,
        user,
        errors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkEmail: email => dispatch(checkEmail(email)),
        processForm: user => dispatch(signupUser(user)),
        loginDemo: () => dispatch(loginDemo()),
        purgeErrors: () => dispatch(purgeErrors()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
