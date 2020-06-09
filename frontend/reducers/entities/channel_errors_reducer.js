import { CLOSE_MODAL } from "../../actions/ui_actions";
import { RECEIVE_CHANNEL_ERRORS, RECEIVE_NAME_BOOL } from "../../actions/channel_actions";
import { PURGE_ERRORS } from "../../actions/session_actions";


const channelErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CHANNEL_ERRORS:
            return action.errors;
        case RECEIVE_NAME_BOOL:
            return [ { nameExists: action.bool }, ...state]
        case CLOSE_MODAL:
            return [];
        case PURGE_ERRORS:
            return [];
        default:
            return state;
    }
}

export default channelErrorsReducer;