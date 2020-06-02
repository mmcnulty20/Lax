import React, { Component } from "react";

class AuthForm extends Component {
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
        const buttonText = this.props.formType === "Edit your profile" ? "Save Changes" : this.props.formType;
        
        return (
            <section className="auth-form">
                <h2>{this.props.formType}</h2>
                <form onSubmit={this.handleSubmit}>
                    {this.props.formType !== "Sign In" ? (

                        <label htmlFor="fullname">Full Name:
                        <br/>
                        <input type="text"
                            id="fullname"
                            value={this.state.username}
                            placeholder={"Full Name"}
                            onChange={this.handleChange("username")} />
                        <br/>
                        </label>
                    ) : null}

                    <label htmlFor="email">Email:</label>
                    <br/>
                    <input type="text"
                        id="email"
                        value={this.state.email}
                        placeholder={"name@work-email.com"}
                        onChange={this.handleChange("email")} />
                    <br/>

                    <label htmlFor="password">Password:</label>
                    <br/>
                    <input type="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleChange("password")} />
                    <br/>
                    <button>{buttonText}</button>
                
                </form>
            </section>
        )
    }
}

export default AuthForm