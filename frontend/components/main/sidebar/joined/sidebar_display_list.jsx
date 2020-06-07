import React, { Component } from "react";
import ListItem from "./display_item";

class DisplayList extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault;
        console.log(e.target);
    }

    handleDelete(id) {
        if ( Number(isInteger(id)) ) {
            this.props.deleteDM(id);
        }
    }

    _contentList(){
        return this.props.content.map( item => {
            const icon = this.props.type === "Channels" ? ( item.isPrivate ? "lock" : "hashtag" ) : "circle"
            // ["far", "circle"]
            return (
                <ListItem
                    id={ item.id }
                    owner={ item.owner }
                    key={ item.id }
                    name={ item.name }
                    icon={ icon }
                    onClick={ this.handleClick }
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