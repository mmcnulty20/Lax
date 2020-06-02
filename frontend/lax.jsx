import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";

import Root from "./components/root";

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
    window.getState = store.getState()
    ReactDOM.render(<Root store={store} />, root)
});