import { RECEIVE_CHANNELS, RECEIVE_CHANNEL, REMOVE_CHANNEL } from "../../actions/channel_actions";

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
        default:
            return state;
    }
}

export default channelsReducer;