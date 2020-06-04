import React, { Component } from "react";
import { Link } from "react-router-dom";

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = props.user;
        this._conditionalText();

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

    _conditionalText(){
        switch (this.props.formType) {
            // case "Edit your profile":
            //     this.buttonText = "Save Changes";
            //     this.redirectText = null;
            //     this.headerText = this.props.formType;
            //     break;
            case "Sign in":
                this.buttonText = this.props.formType;
                this.redirectText = (<p>If you don't have a Lax account, you can <Link to="/signup" >create an account</Link>.</p>)
                this.headerText = (
                    <>
                        <h2>{ `${this.props.formType } to Lax`}</h2>
                        <h4>welcome to lax.com</h4>
                        <h3>Enter your <strong>email address</strong> and <strong>password</strong></h3>
                    </>
                )
                this.labelText = ["", ""]
                this.fieldText = ["you@example.com", "password"]
                this.class = `auth-form-container login`
                break;
            case "Create Account":
                this.buttonText = this.props.formType;
                this.redirectText = (<p>If you already have a Lax account, you can <Link to="/login" >sign in</Link>.</p>)
                this.headerText = <h1>First, create your account</h1> ;
                this.labelText = ["Email address", "Password", "Name"];
                this.fieldText = ["name@work-email.com", "6 characters or more","Your full name"]
                this.class = `auth-form-container signup`
                break;
            default:
                this.buttonText = this.props.formType;
                this.redirectText = null;
                this.headerText = this.props.formType;
                this.labelText = ["", "", ""]
                this.fieldText = ["you@example.com", "password"];
                this.class = `auth-form-container`
                break;
        } 
    }

    render(){
        const errors = this.props.errors.map((err,i) => <li key={i}>{err}</li> )
        return (
            <div className="auth-page">
                <section className={ this.class }>
                    {this.props.errors.length > 0 ? (
                        <ul className="errors">
                            {errors}
                        </ul>
                    ) : null }
                    <section className="auth-form">
                        {this.headerText}
                        <form onSubmit={this.handleSubmit}>
                            {this.props.formType !== "Sign in" ? (
                                <label htmlFor="fullname"><span>{this.labelText[2]}</span>
                                
                                <input type="text"
                                    id="fullname"
                                    value={this.state.username}
                                    placeholder={this.fieldText[2]}
                                    onChange={this.handleChange("username")} />
                                
                                </label>
                            ) : null}

                            <label htmlFor="email">
                                <span>{this.labelText[0]}</span>
                                
                                <input type="email"
                                    id="email"
                                    value={this.state.email}
                                    placeholder={this.fieldText[0]}
                                    onChange={this.handleChange("email")} />
                                                        
                            </label>

                            <label htmlFor="password">
                                <span>{this.labelText[1]}</span>
                                
                                <input type="password"
                                    id="password"
                                    value={this.state.password}
                                    placeholder={this.fieldText[1]}
                                    onChange={this.handleChange("password")} />
                                
                            </label>
                            <button>{this.buttonText}</button>
                        </form>
                            
                    </section>
                    <button className="demo">Log in as a demo user</button>
                </section>
                    {this.redirectText}
            </div>
            
        )
    }
}

export default AuthForm