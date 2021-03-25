import React, { useEffect, useState } from 'react'
import MemberItem from './member_item'

const DMMemberList = ({ members, removeSelected }) => {
    const [formatted, setFormatted] = useState([]);
    useEffect(() => {
        setFormatted(_formatMembers())
    }, [members])

    const  _formatMembers = () => Object.values(members)
        .sort( (a,b) => a.order > b.order ? 1 : -1 )
        .map( ({ username, id }) => 
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