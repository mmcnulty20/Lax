import React, { useState } from 'react'
import DMMemberList from './member_list';

const DMUserSearch = () => {
    // const [members, setMembers] = useState([]);
    const [selected, setSelected] = useState([]);
    // temporary for testing before hooking up to backend search functionality
    let members=[{ id: 1, username: "Megan"}, { id: 2, username: "Demo" }]
    return (
        <div className="dm-searchbar">
            <span className="to">To:</span>
            <DMMemberList members={ members } setSelected={setSelected} />
        </div>
    )
}

export default DMUserSearch