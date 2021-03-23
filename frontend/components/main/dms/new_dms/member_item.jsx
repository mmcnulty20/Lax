import React from 'react'
import DefaultAvatarIcon from "../../avatar_icon";

const MemberItem = ({ username, removeSelected, id }) => (
    <li className="member">
        <DefaultAvatarIcon username={username} />
        <span>
            {username}
        </span>
        <button className="remove-member"
            onClick={ () => removeSelected(id) }>
            <span>x</span>
        </button>
    </li>
)

export default MemberItem