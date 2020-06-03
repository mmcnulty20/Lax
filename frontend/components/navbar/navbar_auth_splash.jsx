import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logoUrl from '../../../app/assets/images/patterns/logo.svg'


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
                    <Link to="#">Github</Link>
                </li>
                <li>
                    <Link to="#">LinkedIn</Link>
                </li>
            </ul>
            {props.loggedIn ? (
                <div className="nav-btns">
                    <button onClick={e => {
                        e.preventDefault();
                        props.logout()}}>
                            Sign Out
                    </button><br/>
                    <button>
                        Lauch Lax
                    </button>
                </div>
                ) : (
                <div className="nav-btns">
                    <Link to="/login">Sign in</Link>
                    <br/>
                    <Link to="/signup">
                        <button className="btn-purple">
                            GET STARTED
                        </button>
                    </Link>
                </div>
            )}
            </nav>
    </div>
)