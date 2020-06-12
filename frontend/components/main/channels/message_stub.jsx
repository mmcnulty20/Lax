import React, { useState } from "react";
import MessageTools from "./message_tools";
import MessageForm from "./message_form";


const MessageStub = React.forwardRef(({ chatChannel, user, newChannel, message: { author_id, id, body, edited }, time}, ref ) => {
    const [ hover, setHover ] = useState(false);
    const [ edit, setEdit ] = useState(false);
    return (
        <>
            { edit ? (
                <>
                    <MessageForm
                        chatChannel={ chatChannel }
                        handleEditEnd={ e => {
                            e.preventDefault();
                            setEdit(false);
                        } }
                        messageId={ id }
                        body={ body }
                        edit={ true } />
                </>
            ) : (
                <li 
                    onMouseEnter={ () => setHover(true) }
                    onMouseLeave={ () => setHover(false) }
                    className={ "message-stub" + ( newChannel ? "extra-space" : "" ) }>
                    <div className={`message-details${ edit ? " edit" : "" }`}>
                        <p>
                            { body }
                            { edited ? <span style={{ color: "#787873", fontSize: "12px", marginLeft: "4px" }}>(edited)</span> : null }
                        </p>
                    </div>
                    <div ref={ ref } />
                    { hover && author_id === user ? (
                    <>
                        <MessageTools
                            chatChannel={ chatChannel }
                            id={ id }
                            edit={ () => setEdit(true) } />
                        <aside>
                            { time }
                        </aside>
                    </>
                ) : hover ? ( <aside>{ time }</aside> ) : null }
                </li>
            ) }
        </>
    )
})

export default MessageStub;