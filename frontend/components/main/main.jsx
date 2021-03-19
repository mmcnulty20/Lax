import React from "react";
import Sidebar from "./sidebar/sidebar";
import { Route, Switch } from "react-router-dom";
import ChannelShowContainer from "./channels/channel_show_container";
import DMShow from "./dms/dm_show";

export default () => (
    <div className="main-content">
        <Sidebar />
        <div className="mainpage-body">
        <Switch>
            <Route path="/c/:id" component={ChannelShowContainer} />
            <Route path="/d/:id" component={DMShow} />
        </Switch>
        </div>
    </div>
)