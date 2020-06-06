import React, { Component } from "react";

class SignupEmailInput extends Component {
    constructor(props) {
        super(props)
        console.log(props)

        this.state = {
            email: props.email,
            error: props.stateErr? props.format(1,props.stateErr) : null,
            check: props.check,
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        console.log("here")
        console.log(e)
        // this.setState({ email: e.target.value });
        this.props.handleChange(email,e)
    }
    
    handleBlur () {
        this.props.checkEmail(e.target.value);        
    }

    render () {
        console.log(this)
        return (
            <label htmlFor="email">
                <span>Email address</span>
                <div className={ this.props.error ? "signup-error" : "no-err"}>
                    <input type="text"
                        id="email"
                        value={this.state.email}
                        onFocus={this.props.handleFocus(1)}
                        onBlur={this.props.handleLeave(1)}
                        placeholder="name@work-email.com"
                        onChange={this.handleChange } />
                        { this.state.error }
                        {this.state.check ? ( <FontAwesomeIcon icon="check-circle" /> ) : null}           
                </div>
            </label>
        )
}}

export default SignupEmailInput;