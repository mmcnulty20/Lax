import { Component } from "react";

class ChannelIndex extends Component {
    render(){
        console.log(this.props)
        return (
            <div>
                <div>
                    <span>
                        Lax
                        <FontAwesomeIcon icon="chevron-down" />
                    </span>
                    <span>
                        { this.props.currentUser.username }
                    </span>
                </div>
                <ComposeButton />
            </div>
        )
    }
}

export default ChannelIndex;