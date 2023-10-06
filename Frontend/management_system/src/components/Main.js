import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import DiscussionBoard from "./DiscussionBoard";
import Schedule from "./Schedule";
import auth from "../utils/auth.hoc";

function Main (){
    return(
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/dashboard" component={auth(Dashboard)}></Route>
                <Route path="/discussion-board" component={auth(DiscussionBoard)}></Route>
                <Route path="/schedule" component={auth(Schedule)}></Route>
            </Switch> 
        </React.Fragment>
    );
}
export default Main;