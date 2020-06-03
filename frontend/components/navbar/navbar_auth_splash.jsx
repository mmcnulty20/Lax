import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logoUrl from '../../../app/assets/images/patterns/logo.svg'


export default props => (
    <div className={props.location === "/welcome" ? "splash-header" : "auth-header"}>
        <figure id="logo-button">
            <Link to="/welcome">
                <svg id="logo-bg">
                    <defs>
                        <pattern id="logo-colors" patternUnits="userSpaceOnUse" width="780" height="780"
                            patternTransform="scale(-1, 1) translate(90, -120)">
                            <image href={logoUrl}  x="0" y="0" width="780" height="780" />
                        </pattern>
                    </defs>
                </svg>
                <FontAwesomeIcon id="logo-img" icon="umbrella-beach" flip="horizontal"/> lax</Link>
        </figure>
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