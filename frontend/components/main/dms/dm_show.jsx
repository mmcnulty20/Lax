import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DMShow = (props) => {
    const dispatch = useDispatch()
    const state = useSelector(  state => state )
    // debugger
    return (
        <div>DMS HERE yo</div>
    )
}

export default DMShow;