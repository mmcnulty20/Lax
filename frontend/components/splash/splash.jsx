import React, { Component } from "react";
import SplashIntro from "./splash_intro";
import SplashBreakdown from "./splash_breakdown";
import SplashContact from "./splash_contact";
import SplashFooter from "./splash_footer";
import SplashLowerButtons from "./splash_lower_buttons";

class Splash extends Component {
    render(){
        return(
            <div className="splash">
                <SplashIntro loginDemo={this.props.loginDemo}/>
                <SplashBreakdown />
                <SplashContact />
                <SplashLowerButtons loginDemo={this.props.loginDemo}/>
                <SplashFooter />
            </div>
        )
    }
}

export default Splash;