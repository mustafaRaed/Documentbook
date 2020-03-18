import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "./components/auth";

function PrivateRoute ({ component: Component, ...rest }) {
    const { user } = useAuth();

    return (
        <Route { ... rest } render = {(props) => user ? (
            <Component {...props} />
        ) : (<Redirect to={{pathname: "/Login", state: { referer: props.location }}} /> )
        }
                            />
    );
}

export default PrivateRoute;