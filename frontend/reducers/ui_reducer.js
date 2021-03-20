import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { OPEN_MODAL, CLOSE_MODAL } from "../actions/ui_actions";

const uiReducer = (state = { modal: false, mainChannel: null }, action) => {
    Object.freeze(state);
    switch (action.type) {
        case OPEN_MODAL: 
            return { ...state, modal: true };
        case CLOSE_MODAL:
            return { ...state, modal: false };
        case RECEIVE_CURRENT_USER:
            return { ...state, mainChannel: action.user.mainChannel }
        default:
            return state;
    }
}

export default uiReducer;