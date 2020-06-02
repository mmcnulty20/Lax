import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default props => (
    <div className={props.location === "/welcome" ? "splash-header" : "auth-header"}>
        <figure id="logo-button">
            <Link to="/welcome">

            <svg width="0" height="0" version="1.1">
              <defs>
                <linearGradient id="UmbrellaGradient" x1="0.65" x2="0" y1="0" y2="1">
                  <stop offset="0%" stop-color="yellow" stop-opacity="1"/>
                  <stop offset="20%" stop-color="red" stop-opacity="1"/>
                  <stop offest="80%" stop-color="#4d0f0f"/>
                </linearGradient>
              </defs>
            </svg>
                
                <FontAwesomeIcon id="logo-img" icon="umbrella-beach" flip="horizontal"/> lax</Link>
        </figure>
        {props.location === "/welcome" ? (
            <button className="hamburger">
                <FontAwesomeIcon icon="bars" />
            </button>
        ) : (
            <button className="btn-menu">
                Menu
            </button>
        )}
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