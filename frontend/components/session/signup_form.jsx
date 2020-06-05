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

    constructor(props) {
        super(props);
        this.state = props.user;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.processForm(this.state);
    }

    _formatErrors(){
        //0: Name errors, 1: email errors, 2: password errors
        const authErrs = this.props.errors;
        const errors = [];
        errors.push(authErrs.find(err => err.include("name")) || null);
        errors.push(authErrs.find(err => err.include("email")) || null);
        errors.push(authErrs.find(err => err.include("password")) || null);
        return errors.map(err => !err ? null : (
            <div className="signup-errors">
                <FontAwesomeIcon icon="exclamation-triangle" />
                <p>{err}</p>
            </div>
        ))
    }
    

    render() {
        const errs = (this.props.errors.length > 0) ? this._formatErrors() : [null, null, null];
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
                                <input type="text"
                                    id="fullname"
                                    value={this.state.username}
                                    placeholder="Your full name"
                                    onChange={this.handleChange("username")} />
                                    {errs[0]}
                            </label>
                            <label htmlFor="email">
                                <span>Email address</span>
                                
                                <input type="email"
                                    id="email"
                                    value={this.state.email}
                                    placeholder="name@work-email.com"
                                    onChange={this.handleChange("email")} />
                                    {errs[1]}             
                            </label>

                            <label htmlFor="password">
                                <span>Password</span>
                                
                                <input type="password"
                                    id="password"
                                    value={this.state.password}
                                    placeholder="6 characters or more"
                                    onChange={this.handleChange("password")} />
                                    {errs[2]}
                            </label>
                            <button>Create Account</button>
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