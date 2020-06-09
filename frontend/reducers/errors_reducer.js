import {combineReducers} from "redux";
import sessionErrorsReducer from "./session/session_errors_reducer";
import channelErrorsReducer from "./entities/channel_errors_reducer";

export default combineReducers({
    session: sessionErrorsReducer,
    channel: channelErrorsReducer,
});