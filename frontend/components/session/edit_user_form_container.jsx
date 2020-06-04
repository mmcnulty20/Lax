import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from './auth_form';
import { updateUser, retrieveUserDetails } from '../../actions/session_actions';

class EditUserForm extends Component {
    componentDidMount () {
        this.props.retrieveUserDetails(this.props.user.id);
    }

    render(){
        const { processForm, formType, user, placeholders } = this.props
        return(
            <AuthForm 
                processForm={processForm}
                formType = {formType}
                user={user}
                placeholders={placeholders} />
        )
    }
}

const mapStateToProps = ({entities: { users }, errors}, ownProps) => {
    const user = users[ownProps.match.params.userId];
    user.password = "";
    const errors = [].concat(...Object.values(errors));
    return {
        user,
        errors,
        formType: 'Edit your profile',
    }
}

const mapDispatchToProps = dispatch => {
    return {
        processForm: user => dispatch(updateUser(user)),
        retrieveUserDetails: userId => dispatch(retrieveUserDetails(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
