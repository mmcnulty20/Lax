import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

class LaunchButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropped: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }
    handleClick(e) {
        console.log(this.state)
        this.setState({dropped: true});
        console.log("revealed!")
        console.log(this.state)
    }
    handleLeave(e) {
        console.log(this.state)
        this.setState({dropped: false});
        console.log("hidden!")
        console.log(this.state)
    }


    render () {
        return (
            <button className="btn-purple launch-btn" onFocus={this.handleClick} onBlur={this.handleLeave}>
                LAUNCH LAX
                <FontAwesomeIcon icon="chevron-down" />
                <div className={`dropdown` + (this.state.dropped ? " reveal" : "") }>
                    <ul className="workspaces">
                        <li>
                            <div>
                                <figure>
                                    <FontAwesomeIcon id="logo-img" icon="umbrella-beach" flip="horizontal"/>
                                </figure>
                                Start Relaxing 
                            </div>
                            <FontAwesomeIcon icon="arrow-right" />
                        </li>
                    </ul>
                    <ul className="links">
                        <li>
                            <div onClick={e => {
                                e.preventDefault();
                                this.props.logout();
                            }}>
                                Sign out
                            </div>
                        </li>
                    </ul>
                </div>
            </button>
        )
    }

}

export default LaunchButton;

// class Dropdown extends React.Component {
//     constructor(props){
//         this.state = {
//             drop: false 
//         }
//         this.clicker.bind(this)
//     }
//     clicker(e) {
//         this.setState(drop, true)
//     }
//     leave(e) {
//         this.setState(drop, false)
//     }
//     render () {
//         <button onFocus={this.clicker} onBlur={this.leave}> 
//             <ul className={this.state ? reveal : hide}>
//                 <li>...
//             </ul>
//         </button> 
//     }
// }