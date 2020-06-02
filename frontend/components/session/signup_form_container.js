import { connect } from 'react-redux';
import { signupUser } from '../../actions/session_actions';
import AuthForm from './auth_form';

const mapStateToProps = state => {
    const user = { username: "", email: "", password: "" }
    const errors = [].concat(...Object.values(state.errors))
    return {
        placeholders: false,
        user,
        errors,
        formType: 'Sign Up'
    }
}

const mapDispatchToProps = dispatch => {
    return {
        processForm: user => dispatch(signupUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
