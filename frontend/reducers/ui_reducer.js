import { LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { OPEN_MODAL, CLOSE_MODAL } from "../actions/ui_actions";

const _defaultState = { modal: false, mainChannel: null }

const uiReducer = (state = _defaultState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case OPEN_MODAL: 
            return { ...state, modal: true };
        case CLOSE_MODAL:
            return { ...state, modal: false };
        case RECEIVE_CURRENT_USER:
            return { ...state, mainChannel: action.user.mainChannel }
        case LOGOUT_CURRENT_USER:
            return _defaultState
        default:
            return state;
    }
}

export default uiReducer;