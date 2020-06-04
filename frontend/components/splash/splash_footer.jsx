import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SplashFooter extends Component {
    render(){
        return(
            <footer className="splash-footer">
                <section className="footer-lists">
                    <figure id="logo-button">
                        <Link to="/welcome">
                            <FontAwesomeIcon id="logo-img" icon="umbrella-beach" flip="horizontal"/></Link>
                    </figure>
                    <nav>
                        <ul>
                            <li>
                                PRODUCT
                            </li>
                            <li>
                                Features
                            </li>
                            <li>
                                Enterprise
                            </li>
                        </ul>
                        <ul>
                            <li>LAX FOR TEAMS</li>
                            <li>Engineering</li>
                            <li>Financial Services</li>
                            <li>Sales</li>
                            <li>IT</li>
                            <li>Marketing</li>
                            <li>Customer Support</li>
                            <li>Human Resources</li>
                            <li>Project Management</li>
                            <li>Media</li>
                        </ul>
                        <ul>
                            <li>RESOURCES</li>
                            <li>Resources Library</li>
                            <li>Lax Tips</li>
                        </ul>
                        <ul>
                            <li>
                                COMPANY
                            </li>
                            <li>About Us</li>
                        </ul>
                    </nav>
                </section>
                <section className="footer-nav">
                    <nav>
                        <ul>
                            <li>Status</li>
                            <li>Privacy & Terms</li>
                            <li>Contact Us</li>
                            <li><FontAwesomeIcon icon="globe" /> Change Region <FontAwesomeIcon icon="chevron-down"/></li>
                        </ul>
                        <ul>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={["fab", "twitter"]} />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={["fab", "facebook"]} />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={["fab", "youtube"]} />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={["fab", "linkedin"]} />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </section>
            </footer>
        )
    }
}

export default SplashFooter;