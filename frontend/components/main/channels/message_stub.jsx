import React, { useState } from "react";
import MessageTools from "./message_tools";
import MessageForm from "./message_form";


const MessageStub = ({ user, newChannel, message: { author_id, id, body, edited }, time, sub }) => {
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
                        messageId={id}
                        sub={sub}
                        body={ body }
                        edit={ true } />
                </section>
            ) : (
                <li
                    key={id} 
                    onMouseEnter={ () => setHover(true) }
                    onMouseLeave={ () => setHover(false) }
                    className={ "message-stub" + ( newChannel ? "extra-space" : "" ) }>
                    <div className={`message-details${ edit ? " edit" : "" }`}>
                        <p>
                            { body }
                            { edited ? <span className="edited">(edited)</span> : null }
                        </p>
                    </div>
                    {/* <div ref={ ref } /> */}
                    { hover && author_id === user ? (
                    <>
                        <MessageTools
                            id={ id }
                            sub={ sub }
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
}

export default MessageStub;