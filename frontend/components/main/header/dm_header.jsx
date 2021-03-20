import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllChannels, fetchUserChannels } from '../../../actions/channel_actions'
import { useComponentDidMount } from '../../../utils/hook_utils'


const DMHeader = ({ location: { pathname } }) => {
    const dispatch = useDispatch()
    const userId = useSelector( ({ session: { currentUserId } }) => currentUserId )
    useComponentDidMount(() => { dispatch( fetchUserChannels(userId) ) })
    const names = useSelector( ({entities: { users, dms } }) => {
        const dm = dms[pathname.slice(3)]
        return dm ? 
            dm.members.filter(i => i != userId)
            .map(memberId => users[memberId] ? users[memberId].username : "").join(", ")
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