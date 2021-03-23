import React from 'react'
import NewDMMessage from './message_page'
import DMUserSearch from './search_header'

const NewDMPage = (props) => {
    // const [members, setMembers] = useState([]);
    // temporary for testing before hooking up to backend search functionality
    let members = [{ id: 1, username: "Megan" }, { id: 2, username: "Demo" }]
    return (
        <form>
            <DMUserSearch members={ members }/>
            <NewDMMessage members={ members }/>
        </form>
    )
}

export default NewDMPage