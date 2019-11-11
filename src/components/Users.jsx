import React from 'react';

const Users = props => {
    const {
        match: { params }
    } = props;
    return (
        <div>
            <h1>Users Page</h1>
            <p>Current user id is {params.id}</p>
        </div>
    );
};

export default Users;
