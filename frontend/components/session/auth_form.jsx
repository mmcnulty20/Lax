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
            case "Edit your profile":
                this.buttonText = "Save Changes";
                this.redirectText = null;
                this.headerText = this.props.formType;
                break;
            case "Sign In":
                this.buttonText = this.props.formType;
                this.redirectText = (<p>If you don't have a Lax account, you can <Link to="/signup" >create an account</Link>.</p>)
                this.headerText = `${this.props.formType} to Lax`;
                break;
            case "Sign Up":
                console.log("here")
                this.buttonText = this.props.formType;
                this.redirectText = <p>If you already have a Lax account, you can <Link to="/login" >sign in</Link>.</p>
                this.headerText = this.props.formType;
                break;
            default:
                this.buttonText = this.props.formType;
                this.redirectText = null;
                this.headerText = this.props.formType;
                break;
        } 
    }

    render(){
        const errors = this.props.errors.map((err,i) => <li key={i}>{err}</li> )
        console.log(this.props)
        console.log(`button: ${this.buttonText} | redirect: ${this.redirectText} | header: ${this.headerText}`)
        return (
            <div className="auth-page">
                {this.props.errors.length > 0 ? (
                    <ul>
                        {errors}
                    </ul>
                ) : null }
                <section className="auth-form">
                    <h2>{this.headerText}</h2>
                    <form onSubmit={this.handleSubmit}>
                        {this.props.formType !== "Sign In" ? (
                            <label htmlFor="fullname">
                            <br/>
                            <input type="text"
                                id="fullname"
                                value={this.state.username}
                                placeholder={"Full Name"}
                                onChange={this.handleChange("username")} />
                            <br/>
                            </label>
                        ) : null}

                        <label htmlFor="email">
                            <br/>
                            <input type="email"
                                id="email"
                                value={this.state.email}
                                placeholder={"name@work-email.com"}
                                onChange={this.handleChange("email")} />
                            <br/>                        
                        </label>

                        <label htmlFor="password">
                            <br/>
                            <input type="password"
                                id="password"
                                value={this.state.password}
                                onChange={this.handleChange("password")} />
                            <br/>
                        </label>
                        <button>{this.buttonText}</button>                
                    </form>
                        
                </section>

                {this.redirectText}

            </div>
            
        )
    }
}

export default AuthForm