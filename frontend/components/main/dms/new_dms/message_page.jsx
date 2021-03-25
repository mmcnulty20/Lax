import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { createDM } from '../../../../actions/dm_actions'
import MessageForm from '../../channels/message_form'


const NewDMMessage = ({ members, setFocused }) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const name = Object.values(members)
        .sort((a, b) => a.order > b.order ? 1 : -1)
        .map( ({username}) => username).join(", ") || "someone new"
    const userId = useSelector( ({ session: { currentUserId } }) => currentUserId )
    
    // for duck-typing purposes
    const sub = {
        speak: ({ message: { body } }) => {
            debugger
            dispatch(createDM({
                ids: [userId, ...Object.keys(members)],
                body
            })).then(({ id }) => { history.push(`/d/${ id.slice(1) }`)})
        }
    }
    return (
        <div className="show">
            <MessageForm 
                setFocused={ setFocused }
                type="DM"
                edit={ false }
                id="new"
                sub={ sub }
                name={ name }
                user={ userId }
                />    
        </div>
    )
}

export default NewDMMessage