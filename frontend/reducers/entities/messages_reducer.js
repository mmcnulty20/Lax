import { RECEIVE_MESSAGE, RECEIVE_CHANNEL_MESSAGES } from "../../actions/message_actions";


const messagesReducer = ( state = {}, action ) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_MESSAGE:
            const locationMsgs = { ...state[action.id], [action.message.id]: action.message }
            return { ...state, [action.id]: locationMsgs }
        case RECEIVE_CHANNEL_MESSAGES:
            return { ...state, [action.id]: action.messages }
        default:
            return state;
    }
}

export default messagesReducer;