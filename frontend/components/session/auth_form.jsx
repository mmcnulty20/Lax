import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthFooter from "./auth_footer";

class AuthForm extends Component {
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

    render(){
        const errors = this.props.errors.map((err,i) => <li key={i}><FontAwesomeIcon icon="exclamation-triangle"/><p>{err}</p></li> )
        return (
            <>
            <div className={`auth-page login`}>
                {this.props.errors.length > 0 ? (
                        <ul className={`errors login`}>
                            {errors}
                        </ul>
                    ) : null }
                <section className={ `auth-form-container login` }>
                    <section className="auth-form">
                        <h2>{ `${this.props.formType } to Lax`}</h2>
                        <h4>welcome to lax.com</h4>
                        <h3>Enter your <strong>email address</strong> and <strong>password</strong></h3>
                        <form onSubmit={this.handleSubmit}>

                            <label htmlFor="email">
                                
                                <input type="email"
                                    id="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    placeholder="you@example.com"
                                    onChange={this.handleChange("email")} />
                                                        
                            </label>

                            <label htmlFor="password">
                                
                                <input type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={this.state.password}
                                    placeholder="password"
                                    onChange={this.handleChange("password")} />
                                
                            </label>
                            <button>Sign in</button>
                        </form>
                            
                    </section>
                    <button onClick={e => this.props.loginDemo()} className="demo">Log in as a demo user</button>
                </section>
                <p>
                    If you don't have a Lax account, you can <Link to="/signup" >create an account</Link>.
                </p>
            </div>
            <div className="auth-footer-container">
                <AuthFooter/>
            </div>
            </>
            
        )
    }
}

export default AuthForm