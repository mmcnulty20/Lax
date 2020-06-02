import React, { Component } from "react";
import SplashIntro from "./splash_intro";


class Splash extends Component {
    render(){
        return(
            <div>
                <SplashIntro />
                <SplashVid />
                <SplashContent />
                <SplashContact />
                <SplashFooter />
            </div>
        )
    }
}

export default Splash;