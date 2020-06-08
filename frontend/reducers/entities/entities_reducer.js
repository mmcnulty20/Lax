import usersReducer from "./users_reducer";
import { combineReducers } from "redux";
import channelsReducer from "./channels_reducer";

export default combineReducers({
    users: usersReducer,
    channels: channelsReducer,
});
