import React, { useState } from 'react'
import DMMemberList from './member_list';
import UserSearchInput from './user_search_input';

const DMUserSearch = ({ members }) => {
    // const [members, setMembers] = useState([]);
    // const [selected, setSelected] = useState([]);
    const [selected, setSelected] = useState(members);

    const removeSelected = (id) => setSelected(selected.filter(m => m.id !== id))
    // temporary for testing before hooking up to backend search functionality
    // let members=[{ id: 1, username: "Megan"}, { id: 2, username: "Demo" }]
    return (
        <div className="dm-searchbar">
            <span className="to">To:</span>
            <ul className="searchbar" id="search-text">
                <DMMemberList members={ selected } removeSelected={removeSelected} />
                <UserSearchInput />
            </ul>
        </div>
    )
}

export default DMUserSearch