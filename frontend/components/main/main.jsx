import React from "react";
import Sidebar from "./sidebar/sidebar";
import { Route, Switch } from "react-router-dom";
import ChannelShowContainer from "./channels/channel_show_container";
import DMShow from "./dms/dm_show";
import NewDMPage from "./dms/new_dms/new_dms";

export default () => (
    <div className="main-content">
        <Sidebar />
        <div className="mainpage-body">
        <Switch>
            <Route path="/c/:id" component={ChannelShowContainer} />
            <Route path="/d/:id" component={DMShow} />
            <Route path="/new-dm" component={NewDMPage}/>
        </Switch>
        </div>
    </div>
)