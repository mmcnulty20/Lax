import React, { Component } from "react";

class ChannelShow extends Component {
    render(){
        const { channel, currentUserId } = this.props
        const newChannel = channel && channel.members && !channel.members.includes(currentUserId)
        return(
            <div className="show">
                <h2> Chat coming soon to a comfy couch near you </h2>
                { newChannel ? (
                    <footer className="new-channel">
                        <div>
                            <h1>You are viewing {channel.name} </h1>
                            <button onClick={ () => this.props.handleJoin( channel.id, [currentUserId] ) }>
                                Join Channel
                            </button>
                        </div>
                    </footer>
                ) : null }
            </div>
        )
    }
}

export default ChannelShow;