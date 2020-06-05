import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import library from "./icons/library"
import Root from "./components/root";
import { loginDemo, checkEmail } from "./actions/session_actions";
// import patterns from "./icons/svg_patterns";

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
    window.checkEmail = checkEmail
    window.getState = store.getState()
    window.dispatch = store.dispatch
    ReactDOM.render(<Root store={store} />, root)
});