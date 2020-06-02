import React, { Component } from "react";

class SplashFooter extends Component {
    render(){
        return(
            <section className="splash-footer">
                <h1>Choose a better way to play</h1>
                <Link to="/signup"><button className="btn-purple">TRY LAX</button></Link>
                <Link to="#"><button className="btn-white">SEE THE DEMO</button></Link>
            </section>
        )
    }
}

export default SplashFooter;