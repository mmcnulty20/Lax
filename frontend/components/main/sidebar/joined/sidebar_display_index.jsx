import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DisplayList from "./sidebar_display_list";
import CreateChannelModalContainer from "./channel_modal_container";

class DisplayIndex extends Component {
    componentDidMount(){
        this.props.fetchIndex(this.props.currentUserId);
    }

    constructor(props) {
        super(props)
        this.state = {
            open: true,
        }
        this.showAddChannel = this.showAddChannel.bind(this);
    }

    showAddChannel(e){
        if (this.props.type === "Channels") {
            this.props.openModal();
        } else {
            this.props.history.push("/new-dm")
        }
    }

    render(){
        return (
            <>
                <section className={ `sidebar-section ${this.props.type === "Channels" ? "c" : "dm"} ${ this.state.open ? "open" : "closed" }`} >
                    <div className="section-head-container"
                        onClick={ e => {
                                if ( e.target.className === "section-head" ) this.setState({ open: !this.state.open })
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
                    </div>
                    {/* Add BROWSE functionality later */}
                    <DisplayList
                        history={ this.props.history }
                        type={ this.props.type }
                        content={ this.props.content }
                        open={ this.state.open }
                        delete={ this.props.delete } />
                </section>
                { this.props.modal ? (
                    <aside className="modal-container">
                        <CreateChannelModalContainer
                            closeModal={ this.props.closeModal } />
                    </aside>
                ) : null }
            </>
        )
    }
}   

export default DisplayIndex;