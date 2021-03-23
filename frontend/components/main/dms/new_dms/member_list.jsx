import React, { useEffect } from 'react'
import MemberItem from './member_item'

const DMMemberList = ({ members, removeSelected }) => {
    let formatted
    useEffect(() => {
        console.log(this)
        formatted = _formatMembers()
    }, [members])

    const  _formatMembers = () => Object.values(members).map( ({ username, id }) => 
        <MemberItem 
            key={ id }
            id={ id }
            username={ username }
            removeSelected={ () => removeSelected(id) }
        />
    )

    return (
        <>
            { formatted }
        </>
    )
}

export default DMMemberList