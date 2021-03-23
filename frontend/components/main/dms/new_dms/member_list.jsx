import React from 'react'
import MemberItem from './member_item'

const DMMemberList = ({ members, setSelected }) => {
    debugger
    const  _formatMembers = () => members.map( ({ username, id }) => 
        <MemberItem 
            key={ id }
            username={ username }
            setSelected={ () => setSelected(username) }
        />
    )
    let formatted = _formatMembers()

    return (
        <>
            { formatted }
        </>
    )
}

export default DMMemberList