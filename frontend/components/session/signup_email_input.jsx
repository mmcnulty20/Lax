import React from "react";

const SignupEmailInput = props => {
    console.log(props)
    if (error) {
        console.log(error)
        console.log(props.format(1,error))
        let error =  props.error ? (
            <div className="error-msg">
                <FontAwesomeIcon icon="exclamation-triangle" />
                <p>{props.error}</p>
            </div>
        ) : null;
    }

    let error = props.error ? "there's an error" : null
    console.log(error)
    return (
        <label htmlFor="email">
            <span>Email address</span>
            <div className={ props.error ? "signup-error" : "no-err"}>
                <input type="text"
                    id="email"
                    value={props.email}
                    onFocus={props.handleFocus(1)}
                    onBlur={props.handleLeave(1)}
                    placeholder="name@work-email.com"
                    onChange={props.handleChange("email")} />
                    {error}
                    {props.check ? ( <FontAwesomeIcon icon="check-circle" /> ) : null}           
            </div>
        </label>
    )
}

export default SignupEmailInput;