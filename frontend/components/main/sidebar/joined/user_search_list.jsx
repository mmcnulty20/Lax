import React from "react";
import DefaultAvatarIcon from "../../avatar_icon";

const UserSearchList = ({ members, inputValue, onInputChange, filtered, focus, blur, focused,height }) => (
    <label htmlFor="user-search" >
        <div className="search-bar-container">
        { members }
        <input type="text"
            className={ focused === "search-text" ? "focus-blue" : "" }
            id="search-text"
            value={ inputValue }
            placeholder={ members ? "" : "Figaro, name@example.com" }
            onChange={ e => onInputChange(e) }
            autoComplete="off"
            onBlur={ e => blur(e) }
            onFocus={ e => focus(e) } />
        </div>
        <ul className={ `search-results${ 
            ( focused === "search-text" ||
                typeof focused === "number" ) &&
                inputValue.length > 0 ? " open" : "" }`}>
            { filtered.length === 0 ? (
                <li>
                    No one found matching <strong> {inputValue}</strong>
                </li>
                ) : filtered.map( user => (
                    <li key={user.id} id={ `s-${user.id}` }
                        tabIndex="0"
                        onFocus={ e => focus(e) }
                        onBlur={ e => blur(e) } >
                        <DefaultAvatarIcon username={ user.username } />
                        { user.username }
                    </li>
                ) ) }
        </ul>

    </label>
)

export default UserSearchList;