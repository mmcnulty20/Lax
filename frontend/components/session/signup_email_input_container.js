import { checkEmail } from '../../actions/session_actions';
import SignupEmailInput from './signup_email_input';
import { connect } from 'react-redux';

const mapStateToProps = ({ errors, session: { emailExists } }) => {
    let stateErr = errors.session.find(err => err.includes("email"))
    stateErr = stateErr === -1 ? null : stateErr
    const unique = !(emailExists === true)
    return {
        stateErr,
        unique,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkEmail: email => dispatch(checkEmail(email)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupEmailInput);
