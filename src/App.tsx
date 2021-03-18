import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Authentication from './Authentication'
import Home from './Home'
import Registration from './Registration'

class App extends React.Component<any, any> {
    render() {
        return (
            <Router>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/register">Signup</Link></li>
                        <li><Link to="/authenticate">Login</Link></li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/register">
                        <Registration />
                    </Route>
                    <Route path="/authenticate">
                        <Authentication />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App
