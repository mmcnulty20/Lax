import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../../utils/route_utils";
import ExternalNavBar from "./navbar_auth_splash";

class NavBar extends Component {
    render(){
        return(
            <nav>
                <Switch>
                    <Route path={["/welcome","/login"]} render={props => <ExternalNavBar {...this.props} />} />
                </Switch>                   
            </nav>
        )
    }
}

export default NavBar