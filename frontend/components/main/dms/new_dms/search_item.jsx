import React from 'react'
import DefaultAvatarIcon from '../../avatar_icon'

const SearchItem = ({ user, selected, addMember }) => (
    <li
    className={ selected ? "selected" : "" }
    onMouseDown={ () => addMember(user) }>
        <DefaultAvatarIcon username={ user.username } />
        { user.username }

    </li>
)

export default SearchItem