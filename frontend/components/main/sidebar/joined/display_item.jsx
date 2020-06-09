import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListItem = ({ type, name, id, handleDelete, handleClick, icon, owner }) => (
    <li onClick={ e => {
        e.persist;
        const newPath = type === "Channels" ? `/c/${id}` : `/d/${id}`
        handleClick(newPath)(e)
    }}>
        <figure className="icon">
            <FontAwesomeIcon icon={icon} />
        </figure>
        <span>
            { name.length > 22 ? name.slice(0,20)+"..." : name } 
        </span>
        { owner === true ? (
            <div onClick={ (e) => { 
                handleDelete(id)(e);
             } }>
                <figure className="x">
                    X
                </figure>
            </div>
            ): null }
    </li>
)

export default ListItem;