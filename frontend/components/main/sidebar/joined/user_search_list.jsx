import React from "react";
import DefaultAvatarIcon from "../../avatar_icon";

const UserSearchList = ({ inputValue, onInputChange, filtered, focus, blur, click }) => (
    <label htmlFor="user-serach">
        <input type="text"
            value={ inputValue }
            placeholder="Figaro, name@example.com"
            onChange={ e => onInputChange(e) }
            onFocus={ e => focus(e) }
            onBlur={ e => blur(e) } />
        <ul className={ `search-results${ inputValue.length > 0 ? " open" : "" }`}>
            { filtered.length === 0 ? (
                <li>
                    No one found matching <strong>{inputValue}</strong>
                </li>
                ) : filtered.map( user => (
                    <li key={user.id}>
                        <DefaultAvatarIcon username={ user.username } />
                        { user.username }
                    </li>
                ) ) }
        </ul>

    </label>
)

export default UserSearchList;