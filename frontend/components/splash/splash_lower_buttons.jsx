import React, { Component } from "react";
import { Link } from "react-router-dom";

class SplashLowerButtons extends Component {
    render(){
        return(
            <section className="splash-lower-btns-bg">
                <section className="splash-lower-btns">
                    <h1>Choose the better way to play</h1>
                    <nav>
                        <Link to="/signup"><button className="btn-white">TRY LAX</button></Link>
                        <Link to="#"><button onClick={e => {
                            e.preventDefault();
                            this.props.loginDemo()}} className="btn-transp">SEE THE DEMO</button></Link>
                    </nav>
                </section>
            </section>
        )
    }
}

export default SplashLowerButtons;