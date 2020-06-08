import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DisplayList from "./sidebar_display_list";
import CreateChannelModal from "./create_channel_modal";

class DisplayIndex extends Component {
    componentDidMount(){
        this.props.fetchIndex(this.props.currentUserId);
    }

    constructor(props) {
        super(props)
        this.state = {
            open: true,
            modal: this.props.modal,
        }
        this.showAddChannel = this.showAddChannel.bind(this)
    }

    showAddChannel(e){
        this.setState({ ...this.state, modal: true })
    }

    render(){
        return (
            <section className={ `sidebar-section ${this.props.type === "Channels" ? "c" : "dm"} ${ this.state.open ? "open" : "closed" }`} >
                <div className="section-head-container"
                    onClick={ () => { 
                        //console.log(`Old Open: ${this.state.open}`)
                        this.setState({ open: !this.state.open }) 
                        //console.log(`New Open: ${this.state.open}`)
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
                        <div className="plus" onClick={ this.showAddChannel }>
                            <span>
                                +
                            </span>
                        </div>
                    </figure>
                    {/* { this.state.modal ? (
                        <CreateChannelModal 
                            close={ this.props.closeModal } />
                    ) : null } */}
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