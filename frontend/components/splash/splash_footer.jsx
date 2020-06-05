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
                                PROFICIENCIES
                            </li>
                            <li>
                                Ruby
                            </li>
                            <li>
                                Ruby on Rails
                            </li>
                            <li>
                                JavaScript
                            </li>
                            <li>
                                React/Redux
                            </li>
                            <li>
                                SQL ( PostgreSQL )
                            </li>
                            <li>
                                HTML
                            </li>
                            <li>
                                CSS/SCSS
                            </li>
                        </ul>
                        <ul>
                            <li>
                                HOW I RE<strong>LAX</strong>
                            </li>
                            <li>
                                Dungeons and Dragons
                            </li>
                            <li>
                                Theater
                            </li>
                            <li>
                                Disney
                            </li>
                            <li>
                                Sketching
                            </li>
                            <li>
                                Eating
                            </li>
                            <li>
                                Candy Making
                            </li>
                            <li>
                                Singing Poorly
                            </li>
                            <li>
                                Camping
                            </li>
                            <li>
                                Beer & Wine Tasting
                            </li>
                            <li>
                                Video Games
                            </li>
                        </ul>
                        <ul>
                            <li>Other Projects</li>
                            <li>
                                <a href="#">
                                    [MERNstack name here]
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    [Javascript Game here]
                                </a>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                REACH OUT
                            </li>
                            <li>
                                Megan McNulty
                            </li>
                            <li>
                                (408) 656 5702
                            </li>
                            <li>
                                <a href="mailto:megan@mcnulty.com" >
                                    Email me
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    [angellist]
                                </a>
                            </li>
                        </ul>
                    </nav>
                </section>
                <section className="footer-nav">
                    <nav>
                        <ul>
                            <li>
                                <a href="https://slack.com/">
                                    Slack
                                </a>
                            </li>
                            <li>
                                <a href="https://slack.com/">
                                    Lax is a Slack Clone
                                </a>
                            </li>
                            <li>
                                <a href="https://slack.com/">
                                    Site for Skill Demonstration Only
                                </a>
                            </li>
                            {/* <li><FontAwesomeIcon icon="globe" /> Change Region <FontAwesomeIcon icon="chevron-down"/></li> */}
                        </ul>
                        <ul>
                            {/* <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={["fab", "twitter"]} />
                                </a>
                            </li> */}
                            <li>
                                <a href="https://github.com/mmcnulty20/">
                                    <FontAwesomeIcon icon={["fab", "github"]} />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={["fab", "angellist"]} />
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