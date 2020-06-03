import React, { Component } from "react";
import { Link } from "react-router-dom";

class SplashLowerButtons extends Component {
    render(){
        return(
            <section className="splash-lower-btns">
                <h1>Choose the better way to play</h1>
                <nav>
                    <Link to="/signup"><button className="btn-white">TRY LAX</button></Link>
                    <Link to="#"><button className="btn-transp">SEE THE DEMO</button></Link>
                </nav>
            </section>
        )
    }
}

export default SplashLowerButtons;