import { RECEIVE_CHANNELS, RECEIVE_CHANNEL, REMOVE_CHANNEL, RECEIVE_NAME_BOOL, RECEIVE_CHANNEL_SEARCH, RECEIVE_NEW_CHANNEL } from "../../actions/channel_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";

const channelsReducer = ( state = { search: [] }, action ) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CHANNELS:
            return { ...state, ...action.channels };
        case RECEIVE_CHANNEL:
        case RECEIVE_NEW_CHANNEL:
            return { ...state, ...action.channel };
        case REMOVE_CHANNEL:
            let newState = { ...state };
            delete newState[action.channel_id];
            return newState;
        case RECEIVE_CHANNEL_SEARCH:
            return { ...state, search: action.results }
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
}

export default channelsReducer;