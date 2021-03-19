import { RECEIVE_CHANNELS } from "../../actions/channel_actions";
import { RECEIVE_DM, REMOVE_DM } from "../../actions/dm_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";

const dmsReducer = ( state = {}, action ) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_CHANNELS:
            return { ...state, ...action.dms }
        case RECEIVE_DM:
            return { ...state, ...action.dm }
        case REMOVE_DM:
            let newState = { ...state }
            delete newState[action.dm_id]
            return newState
        case LOGOUT_CURRENT_USER:
            return {}
        default:
            return state
    }
}

export default dmsReducer