import { OPEN_MODAL, CLOSE_MODAL } from "../actions/ui_actions";

const uiReducer = (state = { modal: false }, action) => {
    Object.freeze(state);
    switch (action.type) {
        case OPEN_MODAL: 
            return { modal: true };
        case CLOSE_MODAL:
            return { modal: false };
        default:
            return state;
    }
}

export default uiReducer;