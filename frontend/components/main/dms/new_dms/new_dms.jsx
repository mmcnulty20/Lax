import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveAllUsers } from '../../../../actions/session_actions'
import { useComponentDidMount } from '../../../../utils/hook_utils'
import NewDMMessage from './message_page'
import DMUserSearch from './search_header'
let i = 0

const NewDMPage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(retrieveAllUsers())
        return () => i = 0
    }, [])

    const [focused, setFocused] = useState(true)
    const [selected, setSelected] = useState({});

    const removeSelected = (id) => {
        const newSelections = { ...selected }
        delete newSelections[id]
        setSelected(newSelections)
    }
    const addMember = user => {
        if ( !selected.hasOwnProperty(user.id) ) setSelected({ ...selected, [user.id]: { ...user, order: ++i } })
    }

    return (
        <section className="new-dm">
            <DMUserSearch { ...{ removeSelected, addMember, selected, focused, setFocused } }/>
            <NewDMMessage setFocused={ () => setFocused( !Object.keys(selected).length ) } members={ selected }/>
        </section>
    )
}

export default NewDMPage