import React from 'react';
import { AuthRoute, ProtectedRoute } from "../utils/route_utils";
import { Route } from "react-router-dom";

import LoginFormContainer from './session/login_form_container';
import SignUpFormContainer from './session/signup_form_container';
import NavBarContainer from './navbar/navbar_container';
import Main from "./main";
import SplashContainer from './splash/splash_container';


const App = () => (
    <>
        <header>
            <NavBarContainer />
        </header>
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignUpFormContainer} />
        <Route exact path="/welcome" component={SplashContainer} />
        <ProtectedRoute exact path="/" component={Main} />
    </>
);

export default App;
