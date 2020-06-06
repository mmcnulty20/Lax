import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListItem = ({ name, id, handleDelete, handleClick, icon, type }) => (
    <li onClick={ e => {
        e.persist;
        handleClick(e)
    }}>
        <FontAwesomeIcon icon={icon} />
        <span>
            { name }
            { id }
        </span>
        { type === "Direct messages" ? (
            <div onClick={ (e) => { 
                e.persist();
                handleDelete(id);
             } }>
                <FontAwesomeIcon icon="times" />
            </div>
            ): null }
    </li>
)

export default ListItem;