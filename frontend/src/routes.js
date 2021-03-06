import React from "react"
import {BrowserRouter,Route,Switch} from "react-router-dom"

import Logon from "./pages/Logon"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import NewCase from "./pages/NewCase"

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/cases/new" component={NewCase}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;