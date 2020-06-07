import React from "react";
import avatarIconUrl from "../../../app/assets/images/default-avatar.svg";

const DefaultAvatarIcon = props => (
    <figure className="avatar">
        <img src={ avatarIconUrl } alt={props.username} />
    </figure>
)

export default DefaultAvatarIcon;