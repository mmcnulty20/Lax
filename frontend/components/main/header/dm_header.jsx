import React from 'react'
import { useSelector } from 'react-redux'


const DMHeader = ({ location: { pathname } }) => {
    const names = useSelector( ({entities: { users, dms }, session: { currentUserId } }) => {
        debugger
        const dm = dms[pathname.slice(3)]
        return dm ? 
            dm.members.filter(i => i != currentUserId)
                .map(memberId => users[memberId].username).join(", ")
        : ""
    })
    return (
        <div className="sub-header">
            <div className="location-info dm">
                { names }
            </div>
        </div>
    )
}

export default DMHeader