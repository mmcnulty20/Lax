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

                    <label htmlFor="fullname">Full Name:</label>
                    <br/>
                    <input type="text"
                        id="fullname"
                        value={this.state.username}
                        { this.props.placeholders ?  `value=${}`} />
                
                </form>
            </section>
        )
    }
}

export default AuthForm