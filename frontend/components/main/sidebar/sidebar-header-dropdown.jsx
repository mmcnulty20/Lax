import React, { Component } from "react";
import DefaultAvatarIcon from "../avatar_icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SidebarHeaderDropdown extends Component {
    render () {
        return (
            <aside className="dropdown">
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
                        <li>
                            View Profile
                        </li>
                    </ul>
                </section>
                <section className="workspace-info">
                    <figure>
                        <FontAwesomeIcon id="logo-img" icon="umbrella-beach" flip="horizontal"/>
                        <p>
                            <span>
                                Lax Chat
                            </span>
                            <span>
                                https://lax-chat.herokuapp.com/
                            </span>
                        </p>
                    </figure>
                    <p>
                        Lax is still in development. It is a clone of the communication app <a href="https://slack.com/">Slack</a>
                    </p>
                </section>
                <ul>
                    <li>
                        Sign out of Lax
                    </li>
                </ul>
            </aside>
        )
    }

}

export default SidebarHeaderDropdown;