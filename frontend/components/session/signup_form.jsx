import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthFooter from "./auth_footer";

class SignupForm extends Component {
    componentWillUnmount(){
        if (this.props.errors.length > 0) {
            this.props.purgeErrors();
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(this.props)
        if (this.props !== newProps) {
            if ( newProps.user.username.length > 0 &&
                !this._validName(this.state.username) ) newProps.errors[0]("Mostly, names can’t contain punctuation. (Apostrophes, spaces, and periods are fine.)")
            this.props = newProps;
            if (newProps.errors) this.errors = this._formatErrors(newProps);
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
            }
        }
        this.errors = [null, null, null]

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleChange(field) {
        return e => { 
            console.log(e.target.value)
            console.log(field)
            this.setState({ [field]: e.target.value })
            if ( field === "email" ) this.props.checkEmail(e.target.value) 
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
            if (this.errors[field]) {
                switch (field) {
                    case 0:
                        if ( this.state.username.length > 0 ) {
                            if (this._validName(this.state.username)) {
                                this.errors[0] = null;
                                this.setState({ check: {...this.state.check, 0: true } })
                            } else {
                                this.errors[0] = (
                                    <div className="error-msg">
                                        <FontAwesomeIcon icon="exclamation-triangle" />
                                        <p>Mostly, names can’t contain punctuation. (Apostrophes, spaces, and periods are fine.)</p>
                                    </div>
                                )
                                this.setState({ ...this.state })
                            }
                            console.log(this.errors)
                        }
                        break;
                    case 1:
                        if (this._validEmail(this.state.email)) {
                            if (this.props.emailExists === true) {
                                this.errors[1] = (
                                    <div className="error-msg">
                                        <FontAwesomeIcon icon="exclamation-triangle" />
                                        <p>That email is already in use.</p>
                                    </div>
                                )
                            //     this.errors[1] = "That email is already in use."
                                this.setState({ check: { ...this.state.check, 1: false } })
                            } else {
                                this.errors[1] = null;
                                this.setState({ check: {...this.state.check, 1: true } })
                            }
                        }
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
            
    _formatErrors(newProps){
        console.log(this.props)
        console.log(newProps || "nope")
        const authErrs = this.props.errors;
        console.log(authErrs)
        const errors = [];
        errors.push(authErrs.find(err => err.includes("name")) || null);
        errors.push(authErrs.find(err => err.includes("email")) || 
            ( this._validEmail(this.state.email) ? null : "It looks like that isn’t a valid email address." ));
        errors.push(authErrs.find(err => err.includes("password")) || null);
        if (errors[2] !== null) {
            errors[2] = errors[2].slice(9);
        }
        return errors.map(err => !err ? null : (
            <div className="error-msg">
                <FontAwesomeIcon icon="exclamation-triangle" />
                <p>{err.trim()}</p>
            </div>
        ))
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
                                <div className={this.errors[1] ? "signup-error" : "no-err"}>
                                    <input type="text"
                                        id="email"
                                        value={this.state.email}
                                        onFocus={this.handleFocus(1)}
                                        onBlur={this.handleLeave(1)}
                                        placeholder="name@work-email.com"
                                        onChange={this.handleChange("email")} />
                                        {this.errors[1]}
                                        {this.state.check[1] ? ( <FontAwesomeIcon icon="check-circle" /> ) : null}           
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