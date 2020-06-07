import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DisplayList from "./sidebar_display_list";

class DisplayIndex extends Component {
    componentDidMount(){
        this.props.fetchIndex();
    }

    constructor(props) {
        super(props)
        this.state = {
            open: true,
        }
    }

    render(){
        return (
            <section className={ `sidebar-section ${this.props.type === "Channels" ? "c" : "dm"} ${ this.state.open ? "open" : "closed" }`} >
                <div className="section-head-container"
                    onClick={ () => { 
                        this.setState({ open: !this.state.open }) 
                    } } >
                    <div className="section-head" >
                        { this.state.open ? (
                            <FontAwesomeIcon icon="caret-down" />
                        ) : (
                            <FontAwesomeIcon icon="caret-right" />
                        ) }
                        { this.props.type }
                    </div>
                    <figure>
                        <div className="plus">
                            <span>
                                +
                            </span>
                        </div>
                    </figure>
                </div>
                {/* Add BROWSE functionality later */}
                <DisplayList
                    type={ this.props.type } 
                    content={ this.props.content }
                    open={ this.state.open }
                    deleteDM={ this.props.deleteDM } />
            </section>
        )
    }
}

export default DisplayIndex;