import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListItem = ({ type, name, id, handleDelete, handleClick, icon, owner }) => {
    const [show, setShow] = useState("false");
    const length = name.length > 22;
    return (
    <li onClick={ e => {
        e.persist;
        const newPath = type === "Channels" ? `/c/${id}` : `/d/${id}`
        handleClick(newPath)(e) }} >
        <figure className="icon">
            <FontAwesomeIcon icon={icon} />
        </figure>
        <span>
            { length ? name.slice(0,20)+"..." : name } 
        </span>
        { owner === true ? (
            <div onClick={ e => handleDelete(id)(e) }>
                <figure className="x">
                    X
                </figure>
            </div>
        ): null }
        {
            length ? (
            <aside className="full-name">
                { name }
            </aside>
            ) : null
        }
    </li>
)}

export default ListItem;