import React, { Component } from "react";
import SplashIntro from "./splash_intro";
import SplashBreakdown from "./splash_breakdown";
import SplashContact from "./splash_contact";
import SplashFooter from "./splash_footer";
import SplashLowerButtons from "./splash_lower_buttons";
import { loginDemo } from "../../actions/session_actions";

class Splash extends Component {
    render(){
        return(
            <div className="splash">
                <SplashIntro loginDemo={loginDemo}/>
                <SplashBreakdown />
                <SplashContact />
                <SplashLowerButtons loginDemo={loginDemo}/>
                <SplashFooter />
            </div>
        )
    }
}

export default Splash;