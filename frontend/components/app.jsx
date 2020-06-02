import React from 'react';
import { AuthRoute, ProtectedRoute } from "../utils/route_utils";
import { Route } from "react-router-dom";

import LoginFormContainer from './session/login_form_container';
import SignUpFormContainer from './session/signup_form_container';
import NavBarContainer from './navbar/navbar_container';
import Splash from './splash/splash';


const App = () => (
    <div>
        <header>
            <NavBarContainer />
        </header>
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignUpFormContainer} />
        <Route exact path="/welcome" component={Splash} />
    </div>
);

export default App;