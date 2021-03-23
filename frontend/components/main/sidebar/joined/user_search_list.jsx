import React, { useRef } from "react";
import DefaultAvatarIcon from "../../avatar_icon";

const UserSearchList = ({ members, inputValue, onInputChange, filtered, focus, blur, focused }) => {
    const autoFocusEl = useRef(null)
    return (
    <label htmlFor="user-search" className="user-search" >
        <ul id="search-text" tabIndex="0"
            onClick={ () => autoFocusEl.current.focus() }
            className={ `members-selected${ 
                focused === "search-text" ?
                " focus-blue" : "" }` }>
            
            { [ ...members, (
                <li key="input" className="input">
                    <input type="text"
                        className={ members.length === 0 && !inputValue ? "empty" : "" }
                        ref={ autoFocusEl }
                        id="search-text"
                        value={ inputValue }
                        placeholder={ members.length !== 0 ? "" : "Figaro, name@example.com" }
                        onChange={ e => onInputChange(e) }
                        autoComplete="off"
                        onBlur={ e => blur(e) }
                        onFocus={ e => focus(e) } />
                </li>
            ) ] }
        </ul>

        <ul className={ `search-results${ 
            ( focused === "search-text" ||
                typeof focused === "number" ) &&
                inputValue.length > 0 ? " open" : "" }`}>
            { filtered.length === 0 ? (
                <li className="no-match">
                    No one found matching <strong> {inputValue} </strong>
                </li>
                ) : filtered.map( user => (
                    <li key={user.id} id={ `s-${user.id}` }
                        className={ user.selected ? "selected" : "" }
                        tabIndex="1"
                        onFocus={ e => focus(e) }
                        onBlur={ e => blur(e) } >
                        <DefaultAvatarIcon username={ user.username } />
                        { user.username }
                    </li>
                ) ) }
        </ul>

    </label>
)}

export default UserSearchList;