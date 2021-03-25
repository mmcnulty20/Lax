import React, { useState } from 'react'
import DMMemberList from './member_list';
import UserSearchInput from './user_search_input';

const DMUserSearch = ({ selected, focused, setFocused, removeSelected, addMember }) => {
    const [value, setValue] = useState("")

    return (
        <div className={ `dm-searchbar${ focused ? " focused" : ""}` }
            tabIndex="0" onFocus={ () => setFocused(true) } >
            <span className="to">To:</span>
            {
                focused ? (
                    <ul tabIndex="1" onBlur={ (e) => setValue("") }
                        className="searchbar" id="search-text">
                        <DMMemberList members={ selected } removeSelected={removeSelected} />
                        <UserSearchInput {...{ addMember, selected, value, setValue }} />
                    </ul>
                ) : (
                    <div className="names">
                            { Object.values(selected)
                                .sort((a, b) => a.order > b.order ? 1 : -1)
                                .map(({ username }) => username).join(", ") }
                    </div>
                )
            }
        </div>
    )
}

export default DMUserSearch