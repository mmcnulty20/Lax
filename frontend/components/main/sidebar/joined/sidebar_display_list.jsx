import React, { Component } from "react";
import ListItem from "./display_item";

class DisplayList extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleClick(path){
        return e => {
            if ( e.target.className !== "x" ) {
                e.preventDefault;
                this.props.history.push(path);
            }
        }
    }

    handleDelete(id) {
        return e => {
            if ( Number.isInteger(id) ) {
                this.props.delete(id);
                this.props.history.push("/c/18")
            }
        }
    }

    _contentList(){
        return this.props.content.map( item => {
            const icon = this.props.type === "Channels" ? ( item.isPrivate ? "lock" : "hashtag" ) : "circle"
            return (
                <ListItem
                    id={ item.id }
                    owner={ item.owner || item.admin }
                    key={ item.id }
                    name={ item.name }
                    icon={ icon }
                    handleClick={ this.handleClick }
                    handleDelete={ this.handleDelete }
                    type={ this.props.type } />
            )
        } )
    }

    render() {
        return (
            <ul className={ this.props.open ? "" : "hide"}>
                { this.props.open ? ( this._contentList() ) : null }
                {/* { this.props.type === "Channels" ? null : ( this._contentList() )} */}
            </ul>
        )
    }
}

export default DisplayList;