import React from 'react'
import NewDMMessage from './message_page'
import DMUserSearch from './search_header'

const NewDMPage = (props) => {
    return (
        <div>
            <DMUserSearch/>
            <NewDMMessage />
        </div>
    )
}

export default NewDMPage