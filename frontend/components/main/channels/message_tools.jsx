import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MessageTools = ({ id, edit, sub }) => {
    return (
        <nav className="message-tool">
            <button className="edit" onClick={ edit }>
                <FontAwesomeIcon icon="pen-fancy" />
            </button>

            <button className="delete" onClick={ () => {
                sub.speak({ message: { delete: true, messageId: id } })
            } }>
            </button>
        </nav>
    )
}

export default MessageTools;