import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logoUrl from '../../../app/assets/images/patterns/logo.svg'
import LaunchButton from "./launch_button";

export default props => (
    <div className={props.location === "/welcome" ? "splash-header" : "auth-header"}>
        <figure id="logo-button">
            <Link to="/welcome">
                <FontAwesomeIcon id="logo-img" icon="umbrella-beach" flip="horizontal"/><span>lax</span></Link>
        </figure>
        <svg id="logo-bg">
                    <defs>
                        <pattern id="logo-colors"  patternContentUnits="objectBoundingBox" width="1" height="1" 
                                patternTransform="scale(-1.2,1.2) translate(66,-58)">
                            <image href={logoUrl}  x="0" y="0" width="1" height="1" />
                        </pattern>
                    </defs>
                </svg>
        <nav className="main-header-nav">
            <ul className="nav-menu-list">
                <li>
                    <a href="https://github.com/mmcnulty20/">Github</a>
                </li>
                <li>
                    <a href="#">LinkedIn</a>
                </li>
            </ul>
            {props.loggedIn ? (
                <div className="nav-btns logged-in">
                    <LaunchButton logout={props.logout} />
                </div>
                ) : (
                    <div className="nav-btns logged-out">
                        { props.location === "/welcome" ? (
                            <>
                                <Link to="/login">Sign in</Link>
                                <br/>
                                <Link to="/signup">
                                    <button className="btn-blue">
                                        GET STARTED
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/signup">
                                    <button className="auth signup">
                                        Create a new account
                                    </button>
                                </Link>
                                <Link to="/login">
                                    <button className="auth signin">
                                        Sign in
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </nav>
    </div>
)