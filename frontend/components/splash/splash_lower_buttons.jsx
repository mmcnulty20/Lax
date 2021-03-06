import React, { Component } from "react";
import { Link } from "react-router-dom";

class SplashLowerButtons extends Component {
    constructor(props) {
        super(props);
        this.handleDemo = this.handleDemo.bind(this);
    }

    handleDemo(e){
        if (this.props.loggedIn) {
            this.props.history.push("/")
        } else {
            this.props.loginDemo(this.props.history);
        }
    }

    render(){
        return(
            <section className="splash-lower-btns-bg">
                <section className="splash-lower-btns">
                    <h1>Choose the better way to play</h1>
                    <nav>
                        <Link to="/signup"><button className="btn-white">TRY LAX</button></Link>
                        <Link to="#">
                            <button onClick={this.handleDemo}
                            className="btn-transp">SEE THE DEMO</button></Link>
                    </nav>
                </section>
            </section>
        )
    }
}

export default SplashLowerButtons;