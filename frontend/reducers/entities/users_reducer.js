import { RECEIVE_ALL_USERS,
            RECEIVE_CURRENT_USER, 
            RECEIVE_USER_DETAILS,
            REMOVE_USER} from "../../actions/session_actions";
import { RECEIVE_CHANNEL } from "../../actions/channel_actions";

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state}
    switch (action.type) {
        case RECEIVE_ALL_USERS:
            return {...action.users, ...newState}
        case RECEIVE_USER_DETAILS:
            newState[action.user.id] = action.user;
            return newState;
        case REMOVE_USER:
            delete newState[action.user.id];
            return newState;
        case RECEIVE_CURRENT_USER:
            newState[action.user.id] = action.user;
            return newState;
        case RECEIVE_CHANNEL: {
            console.log(action.channel)
            return { ...state, ...action.channel.users }
        }
        default:
            return state;
    }
}

export default usersReducer;