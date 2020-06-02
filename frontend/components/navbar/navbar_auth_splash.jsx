import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default props => (
    <div className={props.location === "/welcome" ? "splash-header" : "auth-header"}>
        <figure id="logo-button">
            <Link to="/welcome">
                <FontAwesomeIcon icon="umbrella-beach" flip="horizontal"/> LAX</Link>
        </figure>
        <button className="hamburger">
            <FontAwesomeIcon icon="bars" />
        </button>
        <ul className="nav-menu-list">
            <li>
                <Link to="#">Github</Link>
            </li>
            <li>
                <Link to="#">LinkedIn</Link>
            </li>
            {props.loggedIn ? (
                <li>
                    <button onClick={e => {
                        e.preventDefault();
                        props.logout()}}>
                            Sign Out
                    </button><br/>
                    <button>
                        Lauch Lax
                    </button>
                </li>
            ) : (
                <li>
                    <Link to="/login">Sign In</Link>
                    <br/>
                    <Link to="/signup">
                        <button>
                            Sign Up
                        </button>
                    </Link>
                </li>
            )}
        </ul>
    </div>
)