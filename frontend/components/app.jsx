import React from 'react';
import { AuthRoute, ProtectedRoute } from "../utils/route_utils";
import { Route } from "react-router-dom";

import logoUrl from '../../app/assets/images/patterns/logo.svg'

import LoginFormContainer from './session/login_form_container';
import SignUpFormContainer from './session/signup_form_container';
import NavBarContainer from './navbar/navbar_container';
import Main from "./main";
import SplashContainer from './splash/splash_container';


const App = () => (
    <>
        <svg id="logo-bg">
                <defs>
                    <pattern id="logo-colors"  patternContentUnits="objectBoundingBox" width="1" height="1" 
                            patternTransform="scale(-1.2,1.2) translate(66,-58)">
                        <image href={logoUrl}  x="0" y="0" width="1" height="1" />
                    </pattern>
                </defs>
            </svg>
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
