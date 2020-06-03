import React, { Component } from "react";
import { Link } from "react-router-dom";


class SplashIntro extends Component {
    render(){
        return(
            <div className="splash-intro">
                <section className="intro-text">
                    <p>CHILL AT HOME</p>
                    <h1>Lax brings you together, wherever you are</h1>
                    <p>All of the communication tools you need to spend time with friends, plan time together, and embrace relaxation no matter where you are.</p>
                    <Link to="/signup"><button className="btn-purple">TRY LAX FOR FREE</button></Link>
                    <Link to="#"><button className="btn-white">SEE THE DEMO</button></Link>
                </section>
                <figure className="intro-img">
                    <div></div>
                </figure>
            </div>
        )
    }
}

export default SplashIntro;