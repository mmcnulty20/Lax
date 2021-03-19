import usersReducer from "./users_reducer";
import { combineReducers } from "redux";
import channelsReducer from "./channels_reducer";
import messagesReducer from "./messages_reducer";
import dmsReducer from "./dms_reducer";

export default combineReducers({
    users: usersReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    dms: dmsReducer
});
