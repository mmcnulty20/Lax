import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MessageTools = ({ id, edit }) => {
    return (
        <nav className="message-tool">
            <button className="edit" onClick={ edit }>
                <FontAwesomeIcon icon="pen-fancy" />
            </button>

            <button className="delete" onClick={ () => {
                App.cable.subscriptions.subscriptions[0].speak({ message: { delete: true, messageId: id } })
            } }>
            </button>
        </nav>
    )
}

export default MessageTools;