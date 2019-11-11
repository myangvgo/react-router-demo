import React from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import './App.css';

function App() {
    return (
        <Router>
            <div className='App'>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/users'>Users</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact</Link>
                    </li>
                </ul>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/users/:id' component={Users} />
                    <Route exact path='/contact' component={Contact} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
