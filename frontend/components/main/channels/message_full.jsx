import React, { useState } from "react";
import DefaultAvatarIcon from "../avatar_icon";
import MessageTools from "./message_tools";
import MessageForm from "./message_form";

const MessageFull = React.forwardRef(({ user, newChannel, username, message: { author_id, id, body, edited }, time}, ref ) => {
    const [ hover, setHover ] = useState(false);
    const [ edit, setEdit ] = useState(false);
    return (
        <>
            { edit ? (
                <section className="form-container">
                    <MessageForm
                        handleEditEnd={ e => {
                            e.preventDefault();
                            setEdit(false);
                        } }
                        messageId={ id }
                        body={ body }
                        edit={ true } />
                 </section>
            ) : (
                <li 
                    key={ id }
                    onMouseEnter={ () => setHover(true) }
                    onMouseLeave={ () => setHover(false) }
                    className={ "message-full" + ( newChannel ? "extra-space" : "" ) }>
                    <DefaultAvatarIcon username={ username } />
                    <div className={`message-details${ edit ? " edit" : "" }`}>
                        <h3> { username } <span> { time } </span> </h3>
                        <p>
                            { body }
                            { edited ? <span className="edited">(edited)</span> : null }
                        </p>
                    </div>
                    {/* <div ref={ ref } /> */}
                    { hover &&  author_id === user ? (
                        <MessageTools
                            id={ id }
                            edit={ () => setEdit(true) } />
                    ) : null }
                </li>
            ) }
        </>
    )
})
export default MessageFull;