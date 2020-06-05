import React, { Component } from "react";
import SplashIntro from "./splash_intro";
import SplashBreakdown from "./splash_breakdown";
import SplashContact from "./splash_contact";
import SplashFooter from "./splash_footer";
import SplashLowerButtons from "./splash_lower_buttons";

class Splash extends Component {
    render(){
        const { loggedIn, loginDemo, history } = this.props;
        return(
            <div className="splash">
                <SplashIntro loggedIn={loggedIn} loginDemo={loginDemo} history={history} />
                <SplashBreakdown />
                <SplashContact />
                <SplashLowerButtons loggedIn={loggedIn} loginDemo={loginDemo} history={history} />
                <SplashFooter />
            </div>
        )
    }
}

export default Splash;