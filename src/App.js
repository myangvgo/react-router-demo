import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';
import Contact from './components/Contact';
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
                <Route exact path='/' component={Home} />
                <Route exact path='/users' component={Users} />
                <Route exact path='/contact' component={Contact} />
            </div>
        </Router>
    );
}

export default App;
