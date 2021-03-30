import React from "react";
import { Route,
        Redirect,
        withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { purgeErrors } from "./function_helpers";

const mapStateToProps = ({ entities: { channels }, session: { currentUserId } }) => {
    return {
        loggedIn: Boolean(currentUserId),
        mainChannel: Object.keys(channels)[0]
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
                // loggedIn ? <Redirect to={`/c/${mainChannel}`} />: <Component {...props} />
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
                loggedIn ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    )
}

export const AuthRoute = withRouter(connect(mapStateToProps,null)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps,null)(Protected));