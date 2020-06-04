import React from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AuthFooter = props => {
    return (
        <footer className="auth-footer">
            <div>
                <Link to="/welcome">
                    <FontAwesomeIcon icon="umbrella-beach" flip="horizontal"/>
                </Link>
                <ul>
                    <li>
                        <span>Contact Us</span>
                    </li>
                    <li>
                        <a href="https://github.com/mmcnulty20/">
                            <button>
                                <FontAwesomeIcon icon={["fab", "github"]} />
                            </button>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <button>
                                <FontAwesomeIcon icon={["fab", "linkedin"]} />
                            </button>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default AuthFooter;