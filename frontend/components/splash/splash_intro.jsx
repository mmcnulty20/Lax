import React, { Component } from "react";
import { Link } from "react-router-dom";


class SplashIntro extends Component {
    render(){
        return(
            <section className="splash-intro">
                <p>Chill at home.</p>
                <h1>Lax brings you together, wherever you are</h1>
                <p>All of the communication tools you need to spend time with friends and the community, plan time together, and embrace relaxation no matter where you are.</p>
                <Link to="/signup"><button className="btn-purple">TRY LAX FOR FREE</button></Link>
                <Link to="#"><button className="btn-white">SEE THE DEMO</button></Link>
            </section>
        )
    }
}

export default SplashIntro;