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
        this.setState({dropped: true});
    }
    handleLeave(e) {
        this.setState({dropped: false});
    }


    render () {
        return (
            <button className="btn-blue launch-btn" onFocus={this.handleClick} onBlur={this.handleLeave}>
                <div className="button-text">
                    LAUNCH LAX
                    { this.state.dropped ? (
                        <FontAwesomeIcon icon="chevron-up" />
                    ) : (
                        <FontAwesomeIcon icon="chevron-down" />
                    )}
                </div>
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