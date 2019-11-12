# Introduction to React Router

[TOC]

## What is React Router

Routing is the ability to move between different parts of an application when a user enters a URL or clicks an element (link, button, icon, image etc) within the application.

`react-router` is a routing library built on top of the react which is used to create the routing in react apps.

* `react-router` : the core library
* `react-router-dom` : a variant of the core library meant to be used for the web applications.
* `react-router-native` : a variant of the core library for React Native

## Static Routing vs Dynamic Routing

### Static Routing

You declare routes as parts of the app's initialization before any rendering takes place.

Angular, Express, React Router pre-V4 use static routing.

### Dynamic Routing

Dynamic Routing takes place as your app is rendering.

Everthing is a component in React Router (since V4).

### Router

For web applications, `react-router-dom` package comes with `BrowserRouter` and `HashRouter`.

* `BrowserRouter` is used for a dynamic server that knows how to handle any type of URL. It uses the [HTML5 history](https://developer.mozilla.org/en-US/docs/Web/API/History_API) API to keep the user interface in sync with the URL in the browser address bar.
* `HashRouter` is used for static websites that responds to requests for files that it knows.

**Each router creates a [history](https://github.com/ReactTraining/history) object** that it uses to keep track of the current location and re-renders the application whenever this location changes. 

## Use React Router

### 1. Create react app

```shell
npx create-react-app react-router-demo
```

### 2. Installation

```shell
npm install react-router-dom
```

### 3. Create three components

```jsx
// Home.jsx
import React from 'react';

const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
};

export default Home;

// Users.jsx
import React from 'react';

const Users = () => {
    return (
        <div>
            <h1>Users Page</h1>
        </div>
    );
};

export default Users;

// Contact.jsx
import React from 'react';

const Contact = () => {
    return (
        <div>
            <h1>Contact Page</h1>
        </div>
    );
};

export default Contact;
```

### 4. Add Route Component

`react-router` offers us three components to help us implement routing.

```jsx
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
```

In a `Route` component, we need to pass two props:

* `path` : the specified valid url path
* `component` : which component the user needs to see when navigates to that path.

When a `path` is matched, a React component should be rendered so that there’s a change in the UI.

```jsx
// App.js
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
                <Route path='/' component={Home} />
                <Route path='/users' component={Users} />
                <Route path='/contact' component={Contact} />
            </div>
        </Router>
    );
}

export default App;
```

* If we navigates to '/users', you might notice that both `Home` and `Users` components are rendered. If we want to render a specific Router, we need to add the `exact` prop.

```jsx
// App.js

function App() {
    return (
        <Router>
            <div className='App'>
                <Route exact path='/' component={Home} />
                <Route exact path='/users' component={Users} />
                <Route exact path='/contact' component={Contact} />
            </div>
        </Router>
    );
}
```

### 5. Add Link Component for Navigation

`Link` component provides declarative navigation around your application.

It accepts a `to` prop, which can be a string representation of the Link location, created by concatenating the location’s pathname, search, and hash properties.

The `<Link />` component does not reload the page but rather updates the UI during navigation.

```jsx
// App.js

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
```

### 6. Add Not Found Page

When user navigates to a path that unmatch any of the defined routes, we need to display a `404` Not Found Page.

We will use the `Switch` component to implement this feature.

`Switch` renders components only when path matches it, otherwise it falls back to the Not Found component.

#### Create a Not Found Component

```jsx
// NotFound.jsx

import React from 'react';

const NotFound = () => {
    return <div>404 Not Found</div>;
};

export default NotFound;
```

#### Wrap routes with `Switch`

The **`Switch`** component **only** picks the **first** matching route among all its children routes.

```jsx
// App.js
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
                    <Route exact path='/users' component={Users} />
                    <Route exact path='/contact' component={Contact} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
```

### 7. Redirect user to a new location

In certain cases like the login process, when a user visits protected resources, we will redirect the user to a new location like the login page to sign in the application.

In `react-router`, we will use `Redirect` component to serve this purpose.

The `Route` component expects a `to` prop which can be a url string or an object.

```jsx
// the URL to redirect to
<Route exact path="/">
  {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route>

// A location to redirect to 
// The state object can be accessed via this.props.location.state in the redirected-to component. 
<Redirect 
  to={{ 
    pathname: ‘/login’, 
    state: { from: props.location }
  }}
/>
```

### 8. Url Parameters

Url parameters help to render the same component based on its dynamic url. For example, the `User` component will render different user page for  different user id provided.

```jsx
// App.js
<Switch>
  <Route exact path='/users/:id' component={Users} />
</Switch>
```

```jsx
// Users.jsx

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
```

### 9. Add Nested Routes

When the router’s **`path`** and **`location`** are successfully matched, a `match` object is created. This object contains information about the URL and the path. This information can be accessed as properties on the match object.

* Create a `User` component

```jsx
// User.jsx
import React from 'react';

export const User = ({ match }) => {
    return <div>Current User ID is {match.params.id}</div>;
};
```

* Implement subroutes in the `Users` component.

```jsx
// Users.jsx
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
```

* remove `exact` prop from the `Users` Route

```jsx
// App.js

<Switch>
  <Route exact path='/' component={Home} />
  <Route exact path='/contact' component={Contact} />
  <Route path='/users' component={Users} />
  <Route component={NotFound} />
</Switch>
```

### 10. Programatic navigation

Programatic navigation means we need to redirect the user when an event happens on that route. Such as when a user successfully logged in and then redirect to the detail page.

We are using the `history` object passed by `react-router` to achieve this.

The `history` object typically has the following properties:

- `length` - (number) The number of entries in the history stack

- `action` - (string) The current action (`PUSH`, `REPLACE`, or `POP`)

- `location`  - (object) The current location. May have the following properties:

  - `pathname` - (string) The path of the URL
  - `search` - (string) The URL query string
  - `hash` - (string) The URL hash fragment
  - `state` - (object) location-specific state that was provided to e.g. `push(path, state)` when this location was pushed onto the stack. Only available in browser and memory history.

- `push(path, [state])` - (function) Pushes a new entry onto the history stack

- `replace(path, [state])` - (function) Replaces the current entry on the history stack

- `go(n)` - (function) Moves the pointer in the history stack by `n` entries

- `goBack()` - (function) Equivalent to `go(-1)`

- `goForward()` - (function) Equivalent to `go(1)`

- `block(prompt)` - (function) Prevents navigation (see [the history docs](https://github.com/ReactTraining/history#blocking-transitions))

#### Redirect to Home Page after submit contact

```jsx
// Contact.jsx
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
```

### 11. `Route` Component Render Methods

The `<Route />` component provides three render methods to determine which components to render.

* Render with `component` prop

  The `component` prop defines the React element that will be returned by the Route when the path is matched. It uses **`react.createElement`** to create a new **`React element`** from the given component with  **render props**.

  ```jsx
  <Route
    path="/items"
    exact
    component={Items}
  />
  ```

* Render with `render` function.

  The `render` prop provides the ability for **inline rendering** and **passing extra props** to the element. It  expects a function that returns a React element when the current `location` matches the route’s `path`.

  ```jsx
  // convenient inline rendering
  <Router>
    <Route 
      path="/home" 
      render={() => (<div>List of Items</div>)} 
    />
  </Router>
  
  // pass extra props and spread routeProps to make them available in rendered component
  const extra = { type: “extraProp”}
  <Route 
    exact 
    path=”/items” 
    render={routeProps => (
      <Items 
         {...routeProps} 
         yourExtraProp={extra}
       />
    )}
  />
  ```

* Render with `childern` prop

  The `children` prop expects a function that returns a React element. The element defined by the **`children`** prop is returned for all paths irrespective of whether the current location matches the path or not.

  ```jsx
  // It is always rendered
  <Route
    children={routeProps => (
    	<Items
        {...routeProps}
      />
    )}
  />
  ```

> **Warning:** 
>
> `<Route children>` takes precedence over both  `<Route component>` and  `<Route render>` so don’t use both in the same `<Route>`.
>
> `<Route component>` takes precedence over `<Route render>` so don’t use both in the same `<Route>`.
