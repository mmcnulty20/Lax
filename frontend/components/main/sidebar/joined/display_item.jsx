import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListItem = ({ name, id, handleDelete, handleClick, icon, owner }) => (
    <li onClick={ e => {
        e.persist;
        handleClick(e)
    }}>
        <figure className="icon">
            <FontAwesomeIcon icon={icon} />
        </figure>
        <span>
            { name } 
        </span>
        { owner === true ? (
            <div onClick={ (e) => { 
                e.persist();
                handleDelete(id);
             } }>
                <figure className="x">
                    X
                </figure>
            </div>
            ): null }
    </li>
)

export default ListItem;