import React from "react";

const MessageAlert = ({ num, handleClick }) => {
    
    return (
        <div className="new-message-alert">
            <section className="see-new"
                onClick={ handleClick("see-new") }>
                <span className="arrow">
                    ↓
                </span>
                <span>
                    { num } new message{ num > 1 ? "s" : "" }
                </span>
            </section>
            <section className="clear-new"
                onClick={ handleClick("clear-new") }>
                    <span>
                        X
                    </span>
            </section>
        </div>
    )
}


export default MessageAlert;