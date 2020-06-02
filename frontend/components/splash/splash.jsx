import React, { Component } from "react";
import SplashIntro from "./splash_intro";
import SplashBreakdown from "./splash_breakdown";
// import SplashContent from "./splash_content";
import SplashContact from "./splash_contact";
import SplashFooter from "./splash_footer";


class Splash extends Component {
    render(){
        return(
            <div>
                <SplashIntro />
                <SplashBreakdown />
                {/* <SplashContent /> */}
                <SplashContact />
                <SplashFooter />
            </div>
        )
    }
}

export default Splash;