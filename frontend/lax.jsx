import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import library from "./icons/library"
import Root from "./components/root";
import { loginDemo, checkEmail } from "./actions/session_actions";
import { fetchAllChannels, fetchChannel, fetchUserChannels } from "./actions/channel_actions";
// import patterns from "./icons/svg_patterns";
import size from "lodash/size";
import { addChannelMembers } from "./utils/channel_api_utils";
document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    let preloadedState;
    if (window.currentUser) {
        preloadedState = {
            entities: {
                users: {
                    [window.currentUser.id]: window.currentUser,
                }
            },
            session: {
                currentUserId: window.currentUser.id,
            }
        }
        delete window.currentUser
    }
    const store = configureStore(preloadedState)
    window.size = size
    window.addMembers = addChannelMembers
    // window.userChannels = fetchUserChannels
    // window.getChannel = fetchChannel
    // window.checkEmail = checkEmail
    window.getState = store.getState()
    window.dispatch = store.dispatch
    ReactDOM.render(<Root store={store} />, root)
});