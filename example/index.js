import React from 'react'
import ReactDOM from 'react-dom'
import {
    HashRouter,
    Route,
    Switch
} from "react-router-dom"
import App from './App'
import Test from './test'
import './style.scss'

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/test" exact component={Test} />
        </Switch>
    </HashRouter>,
    document.getElementById('root')
)