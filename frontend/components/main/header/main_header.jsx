import React from "react";

import SubHeaderContainer from "./sub_header_container";
import SearchHeaderContainer from "./search/search_header_container";


const MainHeader = props => (
    <>
        <SearchHeaderContainer />
        <SubHeaderContainer />
    </>
)


export default MainHeader