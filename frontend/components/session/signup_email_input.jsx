import React, { Component } from "react";

// class SignupEmailInput extends PureComponent {
//     constructor(props) {
//         super(props)


//         this.state = {
//             email: props.email,
//             error: props.stateErr? props.format(1,props.stateErr) : null,
//             check: props.check,
//         }

//         this.handleChange = this.handleChange.bind(this)
//         this.handleBlur = this.handleBlur.bind(this)
//         this.handleFocus = this.handleFocus.bind(this)


//     }

//     handleChange(e) {
//         this.setState({ email: e.target.value });
//         e.persist()
//         return this.props.parentHandleChange("email")(e)
//     }
    
//     handleBlur (e) {
//         const val = e.target.value;
//         if ( val.length > 0 ) {
//             this.props.checkEmail(e.target.value);
//         }
//         e.persist()
//         this.props.handleLeave(1)(e)
//     }

//     handleFocus(e) {
//         e.persist()
//         return this.props.handleFocus(1)(e);
//     }

//     render () {
//         return (
//             <label htmlFor="email">
//                 <span>Email address</span>
//                 <div className={ this.props.error ? "signup-error" : "no-err"}>
//                     <input type="text"
//                         id="email"
//                         value={this.state.email}
//                         onFocus={ this.handleFocus }
//                         onBlur={ this.handleBlur }
//                         placeholder="name@work-email.com"
//                         onChange={ this.handleChange } />
//                         { this.state.error }
//                         {this.state.check ? ( <FontAwesomeIcon icon="check-circle" /> ) : null}           
//                 </div>
//             </label>
//         )
// }}

// class Example extends PureComponent {
//     constructor(props) {
//         super(props)
//         this.state = {
//           inputValue: "",
//         };
//     }
  
//     handleChange = event => {
//       this.setState({ inputValue: event.target.value });
//     };
  
//     render() {
//       // The render method on this PureComponent is called only if
//       // props.list or state.inputValue has changed.
//       const filteredList = this.props.list.filter(
//         item => item.text.includes(this.state.inputValue)
//       )
  
//       return (
//         <Fragment>
//           <input onChange={this.handleChange} value={this.state.inputValue} />
//           <ul>{filteredList.map(item => <li key={item.id}>{item.text}</li>)}</ul>
//         </Fragment>
//       );
//     }
//   }

class SignupEmailInput extends Component {
    constructor(props) {
        super(props)
        this.state = { email: "" }

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleChange(e){
        this.setState({ email: e.target.value });
    }

    handleBlur(e) {
        if ( e.target.value.length > 0 ) this.props.checkEmail(this.state);
        e.persist();
        this.props.handleLeave(1)(e);
    }

    handleFocus(e) {
        e.persist();
        this.props.handleFocus(1)(e)
    }

    render () {
        return (
            <input type="text"
                id="email"
                value={this.state.email}
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
                placeholder="name@work-email.com"
                onChange={ this.handleChange } />
        )
    }
}

export default SignupEmailInput;