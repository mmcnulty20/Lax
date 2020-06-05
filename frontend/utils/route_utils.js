import React from "react";
import { Route,
        Redirect,
        withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { purgeErrors } from "./function_helpers";

const mapStateToProps = ({session}) => {
    return {
        loggedIn: Boolean(session.currentUserId),
    }
}

const Auth = ({path, onLeave, loggedIn, exact, component: Component}) => {
    return (
        < Route 
            path={path}
            onLeave={onLeave}
            exact={exact}
            render={props => 
                loggedIn ? <Redirect to="/" />: <Component {...props} />
            }
        />
    )
}

const Protected = ({path, loggedIn, exact, component: Component}) => {
    return (
        < Route 
            path={path}
            exact={exact}
            render={props => 
                loggedIn ? <Component {...props} /> : <Redirect to="/welcome" />
            }
        />
    )
}

export const AuthRoute = withRouter(connect(mapStateToProps,null)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps,null)(Protected));