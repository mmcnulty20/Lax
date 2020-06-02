import React from 'react';
import { AuthRoute, ProtectedRoute } from "../utils/route_utils";
import { Route } from "react-router-dom";

import NavBar from "./navbar/navbar"

const App = () => (
    <div>
        <header>
            <NavBar />
        </header>
        Main
        {/* <AuthRoute path="/login" component={LoginFormContainer} /> */}
        {/* <AuthRoute path="/signup" component={SignUpFormContainer} /> */}
        {/* <Route exact path="/welcome" component={Splash} /> */}
    </div>
);

export default App;