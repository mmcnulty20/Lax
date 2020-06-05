import React, { Component } from "react";
import { Link } from "react-router-dom";
import introImgUrl from "../../../app/assets/images/splash/splash_intro_img.svg"


class SplashIntro extends Component {
    render(){
        return(
            <div className="splash-intro">
                <section className="intro-text">
                    <p>CHILL AT HOME</p>
                    <h1>Lax brings you together, wherever you are</h1>
                    <p>All of the communication tools you need to spend time with friends, plan time together, and embrace relaxation no matter where you are.</p>
                    <Link to="/signup">
                        <button className="btn-blue">
                            <span>TRY LAX FOR FREE</span>
                        </button>
                    </Link>
                    <Link to="#">
                        <button onClick={e => this.props.loginDemo()} className="btn-white">
                            <span>SEE THE DEMO</span>
                        </button>
                    </Link>
                </section>
                <figure className="intro-img">
                    <img src={introImgUrl} alt=""/>
                </figure>
            </div>
        )
    }
}

export default SplashIntro;