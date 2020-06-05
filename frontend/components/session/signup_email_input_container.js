import { checkEmail } from '../../actions/session_actions';
import SignupEmailInput from './signup_email_input';

const mapStateToProps = ({ errors, session: { emailExists } }) => {
    let stateErr = errors.session.find(err => err.slice(0,6) === "Email ")
    stateErr = stateErr === -1 ? null : stateErr
    return {
        stateErr,
        emailExists,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkEmail: email => dispatch(checkEmail(email)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupEmailInput);
