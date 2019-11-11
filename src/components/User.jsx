import React from 'react';

export const User = ({ match }) => {
    return <div>Current User ID is {match.params.id}</div>;
};
