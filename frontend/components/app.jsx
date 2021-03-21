import React from 'react';
import { AuthRoute, ProtectedRoute } from "../utils/route_utils";
import { Route, Switch, Redirect } from "react-router-dom";

import logoUrl from '../../app/assets/images/patterns/logo.svg'

import LoginFormContainer from './session/login_form_container';
import SignUpFormContainer from './session/signup_form_container';
import NavBarContainer from './navbar/navbar_container';
import Main from "./main/main";
import SplashContainer from './splash/splash_container';
import MainHeader from './main/header/main_header';
import { useSelector } from 'react-redux';


const App = () => {
    const cId = useSelector( ({ui: { mainChannel }}) => mainChannel )
    return (<>
        <svg id="logo-bg">
                <defs>
                    <pattern id="logo-colors"  patternContentUnits="objectBoundingBox" width="1" height="1" 
                            patternTransform="scale(-1.2,1.2) translate(66,-58)">
                        <image href={logoUrl}  x="0" y="0" width="1" height="1" />
                    </pattern>
                </defs>
            </svg>
        <header>
            <Switch>
                <Route path="/welcome" component={ NavBarContainer } />
                <AuthRoute path="/login" component={ NavBarContainer } />
                <AuthRoute path="/signup" render={() => null} />
                <ProtectedRoute path="/" component={ MainHeader } />
            </Switch>
        </header>
        <Switch>
            <AuthRoute path="/login" component={LoginFormContainer} />
            <AuthRoute path="/signup" component={SignUpFormContainer} />
            <Route exact path="/welcome" component={SplashContainer} />
            <Redirect exact from="/" to={`/c/${cId}`} />
            <ProtectedRoute path="/" component={ Main } />
        </Switch>
    </>)
};

export default App;
