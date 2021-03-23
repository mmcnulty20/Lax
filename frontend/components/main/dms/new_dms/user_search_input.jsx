import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import SearchItem from './search_item'

const UserSearchInput = ({ selected, addMember }) => {
    const [ value, setValue ] = useState("")
    const [ filtered, setFiltered ] = useState([])
    const users = useSelector(({ entities: { users } }) => Object.values(users), shallowEqual )

    useEffect( () => {
        if ( value === "" ) {
            setFiltered([])
        } else {
            const suggestions = 
                users.filter( 
                    ({username, email}) => username.match(value) || email.match(value) )
                .slice(0, 9)
                .map( u => {
                    const isSelected = !!selected[u.id]
                    return (
                        <SearchItem
                            key={ u.id }
                            addMember={ user => { if ( !isSelected ) {
                                addMember(user); setValue("")
                            }}}
                            user={ u }
                            selected={ isSelected }
                        /> 
                    )
                })
            setFiltered(suggestions.length === 0 ? [(
                <li key="none" className="no-results">
                    <span>No one found matching <strong>{ value }</strong></span>
                </li>
            )] : suggestions)
        }
    }, [value] )
    

    return (
        <>
            <input 
                className="empty"
                type="text"
                onChange={ e => setValue(e.target.value) }
                placeholder="name or name@email.com"
            />
            { value === "" ? null : (
                <ul className="search-suggestions">
                    { filtered }
                </ul>
            ) }
        </>
    )
}

export default UserSearchInput