import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ChannelIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true
        }
    }

    render(){
        return (
            <section className={ `sidebar-section ${ this.state.open ? "open" : "closed" }`} >
                <div className="section-head">
                    { this.state.open ? (
                        <FontAwesomeIcon icon="chevron-down" />
                    ) : (
                        <FontAwesomeIcon icon="chevron-right" />
                    ) }
                    Channels
                </div>
                {/* Add BROWSE functionality later */}
                <ul className={ this.state.open ? "" : "hide" } >

                </ul>
            </section>
        )
    }
}

export default ChannelIndex;