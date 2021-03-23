import React from 'react'
import DefaultAvatarIcon from "../../avatar_icon";

const MemberItem = ({ username, removeSelected, id }) => (
    <li>
        <DefaultAvatarIcon username={username} />
        <span>
            {username}
        </span>
        <button className="remove-member"
            onClick={ () => removeSelected(id) }>
            x
        </button>
    </li>
)

export default MemberItem