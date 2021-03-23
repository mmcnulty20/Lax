import React from 'react'
import MemberItem from './member_item'

const DMMemberList = ({ members, removeSelected }) => {
    debugger
    const  _formatMembers = () => members.map( ({ username, id }) => 
        <MemberItem 
            key={ id }
            id={ id }
            username={ username }
            removeSelected={ () => removeSelected(id) }
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