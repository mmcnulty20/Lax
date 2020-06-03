import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SplashBreakdown extends Component {
    render(){
        return(
            <section className="splash-breakdown">
                <h1>Break away from work</h1>
                <p>Communicate seamlessly with groups of friends through channels for specific purposes</p>
                <ul>
                    <li>
                        <FontAwesomeIcon icon="comments" />
                        <h3>Conversations, organized</h3>
                        <p>Move your group conversations out of hard-to-follow email inboxes and group texts and into dedicated channels.</p>
                    </li>
                    <li>
                        <FontAwesomeIcon icon="scroll" />
                        <h3>Pronounce priorities and chill out</h3>
                        <p>It's simple to search and follow conversations and find important information, so you can spend more time having fun.</p>
                    </li>
                    <li>
                        <FontAwesomeIcon icon="couch" />
                        <h3>Give chill a chance</h3>
                        <p>Email and text chains can be hard to follow. With Lax, you can choose which conversations can be put off, leaving more time for relaxing.</p>
                    </li>
                </ul>
            </section>
        )
    }
}

export default SplashBreakdown;