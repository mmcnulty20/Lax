import { connect } from 'react-redux';
import { signupUser, loginDemo, purgeErrors, checkEmail } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mapStateToProps = ({ errors, session: { emailExists } }) => {
    const email = typeof emailExists !== "string" ? "" : emailExists;
    const user = { username: "", email, password: "" }
    const errorsArr = [].concat(...Object.values(errors))
    return {
        user,
        errors: errorsArr,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // checkEmail: email => dispatch(checkEmail(email)),
        processForm: user => dispatch(signupUser(user)),
        loginDemo: () => dispatch(loginDemo()),
        purgeErrors: () => dispatch(purgeErrors()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
