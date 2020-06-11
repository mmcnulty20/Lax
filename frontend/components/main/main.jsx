import React from "react";
import Sidebar from "./sidebar/sidebar";
import { Switch } from "react-router-dom";
import ChannelShowContainer from "./channels/channel_show_container";

export default () => (
    <div className="main-content">
        <Sidebar />
        {/* <Switch>
            <Route path="/c/:id" component={ChannelShowContainer} />
        </Switch> */}
        <div className="mainpage-body">
            <ChannelShowContainer />
        </div>
    </div>
)