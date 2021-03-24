import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveAllUsers } from '../../../../actions/session_actions'
import { useComponentDidMount } from '../../../../utils/hook_utils'
import NewDMMessage from './message_page'
import DMUserSearch from './search_header'

const NewDMPage = (props) => {
    const dispatch = useDispatch()
    useComponentDidMount(() => { dispatch(retrieveAllUsers()) })

    const [selected, setSelected] = useState({});

    const removeSelected = (id) => {
        const newSelections = { ...selected }
        delete newSelections[id]
        setSelected(newSelections)
    }
    const addMember = user => {
        debugger
        if ( !selected.hasOwnProperty(user.id) ) setSelected({ ...selected, [user.id]: user })
        debugger
    }

    const actions = { removeSelected, addMember }
    // temporary for testing before hooking up to backend search functionality
    // let members = [{ id: 1, username: "Megan" }, { id: 2, username: "Demo" }]
    return (
        <form className="new-dm-form">
            <DMUserSearch {...actions} selected={ selected }/>
            <NewDMMessage members={ selected }/>
        </form>
    )
}

export default NewDMPage