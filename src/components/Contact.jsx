import React from 'react';

const Contact = props => {
    const submitForm = () => {
        props.history.push('/');
    };
    return (
        <div>
            <h1>Contact Page</h1>
            <form>
                <input placeholder='name' type='name' />
                <input placeholder='email' type='email' />
                <button onClick={submitForm}>Submit</button>
            </form>
        </div>
    );
};

export default Contact;
