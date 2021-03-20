import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import library from "./icons/library"
import Root from "./components/root";
import size from "lodash/size";
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
            },
            ui: {
                modal: false,
                mainChannel: window.mainChannel
            }
        }
        delete window.currentUser
        delete window.mainChannel
    }
    const store = configureStore(preloadedState)
    window.size = size
    ReactDOM.render(<Root store={store} />, root)
});