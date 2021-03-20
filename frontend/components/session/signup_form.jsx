import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SignupForm extends Component {
    componentWillUnmount(){
        if (this.props.errors.length > 0) {
            this.props.purgeErrors();
        }
    }

    shouldComponentUpdate(newProps) {
        if ( this.props.errors.length !== newProps.errors.length || this.props.emailExists !== newProps.emailExists) {
            this.props = newProps;
            this.errors = (this.state.submitted) ? this.errors.map ( (err,i) => this._formatStateErrors( i ) ) : this.errors
        }
        return true
    }

    constructor(props) {
        super(props);
        this.errors = [null,null,null]
        this.state = {
            ...props.user,
            submitted: false,
            check: {
                0: false,
                1: false,
                2: false,
            },
        }
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
        this.props.processForm( user )
        this.setState({ submitted: true, check: { 0: false, 1: false, 2: false }})
    }

    handleChange(field) {
        return e => { 
            this.setState({ [field]: e.target.value })
        }
    }

    handleLeave(field){
        return e => {
            const val = e.target.value;
            if ( field === 1 ) {
                this.props.checkEmail( this.state.email )
            }
            e.target.className = ""
            if ( this.props.errors.find( err => err !== null )) {
                switch (field) {
                    case 0:
                        if ( this._validName(val) === true ) {
                            this.errors[0] = null;
                            this.setState({ check: { ...this.state.check, 0: true } });
                        } else {
                            this.errors[0] = this._formatStateErrors( 0 )
                            this.setState({ check: { ...this.state.check, 0: false } });
                        }
                        break;
                    case 1:
                        this.props.checkEmail( this.state.email ).then( () => {
                            if ( !this.props.emailExists && this._validEmail( val ) ) {
                                this.errors[1] = null;
                                this.setState({ check: { ...this.state.check, 1: true } });
                            } else {
                                this.setState({ check: { ...this.state.check, 1: false } });
                                this.errors[1] = this._formatStateErrors( 1 );
                            }
                        });
                        break;
                    case 2: 
                        const pwlength = this.state.password.length
                        if ( pwlength > 5 && pwlength < 73 ) {
                            this.errors[2] = null;
                            this.setState({ check: { ...this.state.check, 2: true } });
                        } else {
                            this.setState({ check: { ...this.state.check, 2: false } });
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
        errors.push(authErrs.find(err => err.includes("email")) || 
            ( this._validEmail(this.state.email) ? ( this.props.emailExists ? "That email is already in use." : null ) : "It looks like that isn't a valid email address." ));
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
                } else if ( this.props.emailExists ) {
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
        if ( typeof msg === "string" ) {
            const result = (
                <div key={i} className="error-msg">
                    <FontAwesomeIcon icon="exclamation-triangle" />
                    <p>{ msg }</p>
                </div>
            )
            return result
        } else if ( this.errors[i] ) {
            return this.errors[i];
        }  else {
            return null;
        }
    }
    

    render() {
        this.errors = this.errors.map( (err, i) => (typeof err === "string" ) ? this._formatStateErrors( i ) : err )
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
                                        autoComplete="name"
                                        onFocus={this.handleFocus(0)}
                                        onBlur={this.handleLeave(0)}
                                        id="fullname"
                                        value={this.state.username}
                                        placeholder="Your full name"
                                        onChange={this.handleChange("username")} />
                                    { this.errors[0] }
                                    {this.state.check[0] ? ( <FontAwesomeIcon icon="check-circle" /> ) : null}
                                </div>
                            </label>

                            <label htmlFor="email">
                                <span>Email address</span>
                                <div className={this.errors[1] ? "signup-error" : "no-err"}>
                                    <input type="text"
                                        autoComplete="email"
                                        id="email"
                                        value={this.state.email}
                                        onFocus={this.handleFocus(1)}
                                        onBlur={this.handleLeave(1)}
                                        placeholder="name@work-email.com"
                                        onChange={this.handleChange("email")} />
                                        {this.errors[1]}
                                        {this.state.check[1] && !this.props.emailExists ? ( <FontAwesomeIcon icon="check-circle" /> ) : null}
                                </div>
                            </label>

                            <label htmlFor="password">
                                <span>Password</span>
                                <div className={this.errors[2] ? "signup-error" : "no-err"}>
                                    <input type="password"
                                        id="password"
                                        autoComplete="new-password"
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