import { RECEIVE_CHANNEL } from "../../actions/channel_actions";
import { RECEIVE_DM } from "../../actions/dm_actions";
import { RECEIVE_MESSAGE, RECEIVE_CHANNEL_MESSAGES, REMOVE_MESSAGE } from "../../actions/message_actions";


const messagesReducer = ( state = {}, action ) => {
    Object.freeze(state);
    const locationMsgs = { ...state[action.cId] }
    switch (action.type) {
        case RECEIVE_MESSAGE:
            return { ...state, [action.cId]: { ...locationMsgs, [action.message.id]: action.message } }
        case RECEIVE_CHANNEL_MESSAGES:
        case RECEIVE_CHANNEL:
        case RECEIVE_DM:
            return { ...state, [action.id]: action.messages }
        case REMOVE_MESSAGE:
            delete locationMsgs[action.id]
            return { ...state, [action.cId]: locationMsgs }
        default:
            return state;
    }
}

export default messagesReducer;