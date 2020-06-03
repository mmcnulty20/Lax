import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SplashContact extends Component {
    render(){
        return(
            <section className="splash-contact">
                <h1>Contact Me</h1>
                <nav>
                    <Link to="https://github.com/mmcnulty20/">
                        <button>
                            <FontAwesomeIcon icon={["fab", "github"]} />
                        </button>
                    </Link>
                    <Link to="#">
                        <button>
                            <FontAwesomeIcon icon={["fab", "linkedin"]} />
                        </button>
                    </Link>
                </nav>
            </section>
        )
    }
}

export default SplashContact;