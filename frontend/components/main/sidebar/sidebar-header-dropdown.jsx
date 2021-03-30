import React, { useState } from "react";
import DefaultAvatarIcon from "../avatar_icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import MyProfile from "./my_profile";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../actions/session_actions";

const SidebarHeaderDropdown = ({ open, user }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [profileWarning, setProfileWarning] = useState(false)
    return (
        <aside className={`dropdown${ open ? "" : " hide" }`}>
            <section className="user">
                <DefaultAvatarIcon username={ user.username } />
                <p>
                    <span>
                        { user.username }
                    </span>
                    <span>
                        Welcome to Lax.
                    </span>
                </p>
            </section>

            <section className="options">
                <ul>
                    <li onClick={ e => {
                            e.preventDefault();
                            setProfileWarning(true) 
                        }}>
                        View Profile
                        { profileWarning ? (
                            <MyProfile />
                        ) : null }
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
                <li onClick={ () => dispatch(logoutUser()).then(() => history.push("/login")) }>
                    Sign out of Lax
                </li>
            </ul>
        </aside>
    )
}


export default SidebarHeaderDropdown;