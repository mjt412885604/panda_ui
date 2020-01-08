import React from 'react'
import ReactDOM from 'react-dom'
import {
    HashRouter,
    Route,
    Switch
} from "react-router-dom"
import App from './App'
import Test from './test'
import Refresh from './refresh'
import './style.scss'

class ScrollToTop extends React.Component<any> {
    componentDidUpdate(prevProps) {
        if (
            this.props.location.pathname !== prevProps.location.pathname
        ) {
            window.scrollTo(0, 1)
        }
    }

    render() {
        return null;
    }
}

ReactDOM.render(
    <HashRouter>
        <ScrollToTop />
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/test" exact component={Test} />
            <Route path="/refresh" exact component={Refresh} />
        </Switch>
    </HashRouter>,
    document.getElementById('root')
)