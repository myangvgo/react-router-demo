import React from 'react';
import { Route, Link } from 'react-router-dom';
import { User } from './User';

const Users = props => {
    const { path, url } = props.match;
    return (
        <div>
            <h1>Users Page</h1>
            <p>Select a user</p>
            <ul>
                <li>
                    <Link to={`${url}/1`}>User 1</Link>
                </li>
                <li>
                    <Link to={`${url}/2`}>User 2</Link>
                </li>
                <li>
                    <Link to={`${url}/3`}>User 3</Link>
                </li>
            </ul>
            <Route path={`${path}/:id`} component={User} />
        </div>
    );
};

export default Users;
