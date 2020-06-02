import React from "react";
import { Link } from "react-router-dom";

export default props => (
    <aside>
        {props.currentUser ? (
            <p>
                Welcome {props.currentUser.username}
                <br/>
                <button onClick={e => {
                    e.preventDefault();
                    props.logout()}}>
                        Sign Out
                    </button>
                <br/>
                <Link to="/welcome" >Back</Link>
            </p>
        ) : (
            <p>
                <Link to="/signup">Sign Up</Link>
                <br/>
                <Link to="/login">Sign In</Link>
            </p>
        )}
    </aside>
)

// export default props => {
//     console.log(props);
//     return(
//         <h1>test</h1>
//     )
// }