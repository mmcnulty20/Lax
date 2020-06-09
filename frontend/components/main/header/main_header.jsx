import React from "react";

import SubHeaderContainer from "./sub_header_container";
import SearchHeaderContainer from "./search/search_header_container";
import { Redirect } from "react-router-dom";


const MainHeader = props => (
    <div className="mainpage-head">
        <SearchHeaderContainer />
        <SubHeaderContainer path={ props.location.pathname }/>
    </div>
)


export default MainHeader