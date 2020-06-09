import { RECEIVE_CHANNELS, RECEIVE_CHANNEL, REMOVE_CHANNEL, RECEIVE_NAME_BOOL } from "../../actions/channel_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";

const channelsReducer = ( state = {}, action ) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CHANNELS:
            return { ...state, ...action.channels };
        case RECEIVE_CHANNEL:
            return { ...state, ...action.channel.channels };
        case REMOVE_CHANNEL:
            let newState = { ...state };
            delete newState[action.channel_id];
            return newState;
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
}

export default channelsReducer;