import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import SearchItem from './search_item'

const UserSearchInput = ({ selected, addMember, value, setValue }) => {

    const [ filtered, setFiltered ] = useState([])
    const users = useSelector(
    ({ entities: { users }, session: { currentUserId: id } }) => {
        const { [id]: _, ...r } = users // r is an object with all users but the current
        return Object.values(r)
    }, shallowEqual )

    useEffect( () => {
        if ( value === "" ) {
            setFiltered([])
        } else {
            const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const suggestions = 
                users.filter( 
                    ({username, email}) => username.match(escaped) ||
                        email.match(escaped) )
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
    
    const empty = !Object.keys(selected).length

    return (
        <>
            <input 
                className={ `search-input${ empty ? " empty" : "" }` }
                type="text"
                value={ value }
                onChange={ e => setValue(e.target.value) }
                placeholder={ empty ? "name or name@email.com" : "" }
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