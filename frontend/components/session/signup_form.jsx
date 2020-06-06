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

    // static getDerivedStateFromProps(newProps) {
    //     console.log(newProps)
    //     console.log(this)
    //     if (this.errors !== newProps.errors) {
    //         let newErrs = this._formatErrorProps(newProps.errors)
    //         newErrs = newErrs.map( (err,i) => this.errors === null ? newErrs : this.errors );
    //         this.errors = newErrs;

    //     }
    //     // const oldErrs = this.errors;
    //     // const newErrs = this._formatErrorProps(this.props.errors);
    //     // newErrs.forEach( (err,i) => this.errors[i] = ( err === null ? this.errors[i] : err ) )
    //     // this.setState({ ...this.state })
    //     // }
    // }
    componentWillReceiveProps(newProps) {
        console.log(this.props)
        if (this.props !== newProps) {
            this.props = newProps;
            if (newProps.errors) this.errors = this._formatErrorProps(newProps.errors);
        }
    }

    constructor(props) {
        super(props);
        this.errors = [null,null,null]
        this.state = {
            ...props.user,
            check: {
                0: false,
                1: false,
                2: false,
            },
        }
        // this._formatErrorProps( this.state.errors )
        window.errors = () => this.errors
        this.errors = [null, null, null]

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.handleFocus = this.handleFocus.bind(this);

        this._formatStateErrors =  this._formatStateErrors.bind(this);
        this._formatErrorProps = this._formatErrorProps.bind(this);
        this._createErrorHolder = this._createErrorHolder.bind(this)

    }

    handleSubmit(e){
        e.preventDefault();
        const { username, email, password } = this.state;
        const user = { username, email, password }
        this.props.processForm( user );
        // this._formatErrorProps(this.props.errors)
        // debugger
        this.setState({check: { 0: false, 1: false, 2: false }})
    }

    handleChange(field) {
        return e => { 
            this.setState({ [field]: e.target.value })
        }
    }

    handleLeave(field){
        return e => {
            e.target.className = ""
            const val = e.target.value;
            if ( this.errors[field] ) {
                switch (field) {
                    case 0:
                        if ( this._validName(this.state.username) === true ) {
                            this.errors[0] = null;
                            this.setState({ check: { ...this.state.check, 0: true } });
                        } else {
                            this.errors[0] = this._formatStateErrors( 0 )
                            this.setState({ check: { ...this.state.check, 0: false } });
                        }
                        break;
                    case 1:
                        if ( !this.emailExists && this._validEmail( this.state.email ) ) {
                            this.errors[1] = null;
                            this.setState({ check: { ...this.state.check, 1: true } });
                        } else {
                            this.errors[1] = this._formatStateErrors( 1 );
                            this.setState({ check: { ...this.state.check, 1: false } });
                        }
                        break;
                    case 2: 
                        const pwlength = this.state.password.length
                        if ( pwlength > 5 && pwlength < 73 ) {
                            this.errors[2] = null;
                            this.setState({ check: { ...this.state.check, 2: true } });
                        } else {
                            this.setState({ check: { ...this.state.check, 1: false }, password: e.target.value });
                            this.errors[2] = this._formatStateErrors( 2 );
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
            
    _formatErrorProps(props = []){
        const authErrs = props;
        const errors = [];
        errors.push(authErrs.find(err => err.includes("name")) || null);
        if (errors[0] !== null) {
            errors[0] = errors[0].slice(9)
        }
        errors.push(authErrs.find(err => err.includes("email")) || null);
        if (this.emailExists) errors[1] = "That email is already in use."
        errors.push(authErrs.find(err => err.includes("password")) || null);
        if (errors[2] !== null) {
            errors[2] = errors[2].slice(9);
        }
        return errors.map( (err, i) => i !== 1 ? this._createErrorHolder(i, err) : err )
    }

    _formatStateErrors( i ) {
        let errMsg;
        switch (i) {
            case 0:
                const username = this.state.username;
                if ( username.length > 0 && !this._validName(username ) ) {
                    errMsg = "Mostly, names can’t contain punctuation. (Apostrophes, spaces, and periods are fine.)";
                } else if (username.length === 0) {
                    errMsg = "This is required — you’ll need to enter a name.";
                }
                break;
            case 1: 
                const email = this.state.email;
                if ( email.length === 0 ) {
                    errMsg = "This is required — you’ll need to enter an email."
                } else if ( this.emailExists ) {
                    errMsg = "That email is already in use."
                } else if (!this._validEmail(email)) {
                    errMsg = "It looks like that isn’t a valid email address."
                }
                break;
            case 2:
                const pwlength = this.state.password.length;
                if (pwlength === 0 ) {
                    errMsg = "This is required — you’ll need to enter a password."
                } else if ( pwlength > 0 && pwlength < 6 ) {
                    errMsg = "Your password must be at least 6 characters long."
                } else if ( pwlength > 72 ) {
                    errMsg = "Your password can’t be more than 72 characters long."
                }
                break;
            default:
                break;
        }
        return this._createErrorHolder(i, errMsg)
    }

    _createErrorHolder(i, msg){
        console.log(this.errors)
        console.log(this.errors[i])
        let test;
        if ( typeof msg === "string" ) {
            return (
                <div key={i} className="error-msg">
                    <FontAwesomeIcon icon="exclamation-triangle" />
                    <p>{ msg }</p>
                </div>
            )
        } else if ( this.errors[i] ) {
            return this.errors[i];
        }  else {
            return null;
        }
    }
    

    render() {
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
                            
                            <label htmlFor="email">
                                <span>Email address</span>
                                <div className={ this.props.errors[1] ? "signup-error" : "no-err"}>
                                    <SignupEmailInput 
                                        handleFocus={this.handleFocus}
                                        handleLeave={this.handleLeave} />
                                    { this.state.error }
                                    { this.state.check ? (
                                        <FontAwesomeIcon icon="check-circle" />
                                        ) : null }
                                </div>
                            </label>

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