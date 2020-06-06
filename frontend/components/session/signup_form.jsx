import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SignupEmailInput from "./signup_email_input";
import SignupEmailInputContainer from "./signup_email_input_container";

class SignupForm extends Component {
    componentWillUnmount(){
        if (this.props.errors.length > 0) {
            this.props.purgeErrors();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            ...props.user,
            check: {
                0: false,
                1: false,
                2: false,
            },
        }
        this.errors = props.errors

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.handleFocus = this.handleFocus.bind(this);

        this._secondaryErrFormat =  this._secondaryErrFormat.bind(this);

    }

    handleChange(field,backupTarget) {
        return e => { 
            console.log(e)
            console.log(backupTarget)
            this.setState({ [field]: e.target.value })
        };
    }

    handleSubmit(e){
        e.preventDefault();
        const { username, email, password } = this.state;
        const user = { username, email, password }
        this.props.processForm( user );
        this.setState({check: { 0: false, 1: false, 2: false }})
    }

    handleLeave(field){
        return e => {
            e.target.className = ""
            if ( this.errors[field] ) {
                switch (field) {
                    case 0:
                        const username = this.state.username
                        if (this._validName(username)) {
                            this.errors[0] = null;
                            this.setState({ check: {...this.state.check, 0: true } })
                        } else if ( username.length > 0 ) {
                            this.errors[0] = (
                                <div className="error-msg">
                                    <FontAwesomeIcon icon="exclamation-triangle" />
                                    <p>Mostly, names can’t contain punctuation. (Apostrophes, spaces, and periods are fine.)</p>
                                </div>
                            )
                            this.setState( { ...this.state } )
                        } else {
                        }
                        break;
                    case 1:
                        break;
                    case 2: 
                        if (this.state.password.length > 5) {
                            this.errors[2] = null;
                            this.setState({ check: {...this.state.check, 2: true } })
                        }
                        break;
                    default: 
                        break;
                }
            }     
        }
    }

    handleFocus(field) {
        return e => {
            console.log(e.target)
            if ( field === 1 ) 
            if (this.errors[field]) {
                e.target.className = "focus-red"
            } else {
                e.target.className = "focus-blue"
            }
        }
    }

    _validEmail(emailStr) {
        const valid = emailStr.search(/^[a-zA-Z0-9][\w-.]*[@][a-zA-Z0-9][\w-]*[.][\w-]*[a-zA-Z0-9]$/)
        return valid !== -1
    }

    _validName(name) {
        const vaild = name.search(/^[\w-.]+[\w-.\s]*[\w-.]*$/);
        return vaild !== -1;
    }
            
    _formatErrors(props = []){
        const authErrs = props.errors;
        const errors = [];
        errors.push(authErrs.find(err => err.includes("name")) || null);
        if (errors[0] !== null) {
            errors[0] = errors[0].slice(9)
        }
        errors.push(null)
        // errors.push(authErrs.find(err => err.includes("email")) || 
        //     ( this._validEmail(this.state.email) ? null : "It looks like that isn’t a valid email address." ));
        errors.push(authErrs.find(err => err.includes("password")) || null);
        if (errors[2] !== null) {
            errors[2] = errors[2].slice(9);
        }
        return errors.map( (err, i) => {
            i !== 1 ? this._secondaryErrFormat(i) : err
        })
    }

    _secondaryErrFormat( i, msg ) {
        let errMsg = msg;
        switch (i) {
            case 0:
                const username = this.state.username;
                if ( this.state.username.length > 0 && !this._validName(this.state.username ) ) {
                    errMsg = "Mostly, names can’t contain punctuation. (Apostrophes, spaces, and periods are fine.)";
                }
                break;
            case 1: 
                break;
            case 2:
                const pwlength = this.state.password.length;
                if ( pwlength > 0 && pwlength < 6 ) {
                    errMsg = "Your password must be at least 6 characters long."
                } else if ( pwlength > 72 ) {
                    errMsg = "Your password can’t be more than 72 characters long."
                }
                break;
            default:
                break;
        }
        if ( this.errors[i] && errMsg ) {
            return (
                <div className="error-msg">
                    <FontAwesomeIcon icon="exclamation-triangle" />
                    <p>{errMsg}</p>
                </div>
            )
        } else if ( this.errors[i] ) {
            return this.errors[i];
        }  else {
            return null;
        }
    }
    

    render() {
        // console.log(this.errors)
        return (
            <div className="auth-page signup">
                <figure id="logo-button">
                    <Link to="/welcome">
                        <FontAwesomeIcon icon="umbrella-beach" flip="horizontal"/>
                        <span>lax</span>
                    </Link>
                </figure>
                <section className={ `auth-form-container signup` }>
                    <section className="auth-form">
                        <h1>First, create your account</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="fullname">
                                <span>Name</span>
                                <div className={this.errors[0] ? "signup-error" : "no-err"}>
                                    <input type="text"
                                        onFocus={this.handleFocus(0)}
                                        onBlur={this.handleLeave(0)}
                                        id="fullname"
                                        value={this.state.username}
                                        placeholder="Your full name"
                                        onChange={this.handleChange("username")} />
                                    {this.errors[0]}
                                    {this.state.check[0] ? ( <FontAwesomeIcon icon="check-circle" /> ) : null}
                                </div>
                            </label>
                            
                            <SignupEmailInputContainer 
                                // emailExists={this.emailExists}
                                // handleChange={this.handleChange}
                                handleFocus={this.handleFocus}
                                handleLeave={this.handleLeave}
                                email={this.state.email}
                                format={this._secondaryErrFormat}
                                check={this.state.check[1]} />

                            <label htmlFor="password">
                                <span>Password</span>
                                <div className={this.errors[2] ? "signup-error" : "no-err"}>
                                    <input type="password"
                                        id="password"
                                        value={this.state.password}
                                        onFocus={this.handleFocus(2)}
                                        onBlur={this.handleLeave(2)}
                                        placeholder="6 characters or more"
                                        onChange={this.handleChange("password")} />
                                        {this.errors[2]}
                                        {this.state.check[2] ? ( <FontAwesomeIcon icon="check-circle" /> ) : null}
                                </div>
                            </label>
                            <button disabled={ this.errors.some(e => e !== null) ? true : false }>Create Account</button>
                        </form>
                            
                        <button onClick={e => this.props.loginDemo()} className="demo">Log in as a demo user</button>
                    </section>
                    <p>If you already have a Lax account, you can <Link to="/login" >sign in</Link>.</p>
                </section>
                <ul className="signup-footer-container">
                    <li>
                        <a href="https://slack.com/">
                            Slack
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/mmcnulty20/">
                            Github
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            LinkedIn
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default SignupForm