import { RECEIVE_ALL_USERS,
            RECEIVE_CURRENT_USER, 
            RECEIVE_USER_DETAILS,
            REMOVE_USER} from "../../actions/session_actions";
import { RECEIVE_CHANNEL, RECEIVE_CHANNELS } from "../../actions/channel_actions";
import { RECEIVE_CHANNEL_MESSAGES } from "../../actions/message_actions";
import { RECEIVE_DM } from "../../actions/dm_actions";

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state}
    switch (action.type) {
        case RECEIVE_ALL_USERS:
        case RECEIVE_CHANNEL:
            const users = {}
            Object.keys(action.users).forEach(id => { 
                users[id] = { ...newState[id], ...action.users[id] } 
            })
            return {...newState, ...users}
        case RECEIVE_USER_DETAILS:
            newState[action.user.id] = action.user;
            return newState;
        case REMOVE_USER:
            delete newState[action.user.id];
            return newState;
        case RECEIVE_CURRENT_USER:
            newState[action.user.id] = action.user;
            return newState;
        case RECEIVE_CHANNEL_MESSAGES:
        case RECEIVE_CHANNELS:
        case RECEIVE_DM:
            Object.values(action.users).forEach( u => {
                if ( !newState[u.id] ) newState[u.id] = u
            })
            return newState;
        default:
            return state;
    }
}

export default usersReducer;