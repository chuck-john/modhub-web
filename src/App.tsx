import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Authentication from './Authentication'
import Home from './Home'
import Registration from './Registration'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'

export default function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/authenticate'>Login</Link></li>
          <li><Link to='/register'>Signup</Link></li>
        </ul>
      </nav>

      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/authenticate' component={Authentication}/>
        <Route exact path='/register' component={Registration}/>
      </Switch>
    </Router>
  )
}
