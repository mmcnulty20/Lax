import React, { Component } from "react";
import DefaultAvatarIcon from "../avatar_icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SidebarHeaderDropdown extends Component {
    render () {
        return (
            <aside className={`dropdown${ this.props.open ? "" : " hide" }`}>
                <section className="user">
                    <DefaultAvatarIcon username={ this.props.user.username } />
                    <p>
                        <span>
                            { this.props.user.username }
                        </span>
                        <span>
                            Welcome to Lax.
                        </span>
                    </p>
                </section>

                <section className="options">
                    <ul>
                        <li onClick={ this.renderProfile }>
                            View Profile
                        </li>
                    </ul>
                </section>

                <section className="workspace-info-container">
                    <section className="workspace-info">
                        <section>
                            <figure>
                                <FontAwesomeIcon id="logo-img" icon="umbrella-beach" flip="horizontal"/>
                            </figure>
                            <p>
                                <span>
                                    Lax Chat
                                </span>
                                <span>
                                    lax-chat.herokuapp.com
                                </span>
                            </p>
                        </section>
                        <p>
                            Lax is still in development. It is a clone of the communication app <a href="https://slack.com/">Slack</a>
                        </p>
                    </section>
                </section>
                <ul>
                    <li onClick={ () => this.props.logout() }>
                        Sign out of Lax
                    </li>
                </ul>
            </aside>
        )
    }

}

export default SidebarHeaderDropdown;