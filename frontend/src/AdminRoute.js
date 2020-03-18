import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import { useAuth } from "./components/auth";

function AdminRoute ({ component: Component, ...rest }) {
    const { user } = useAuth();

    return (
        <Route { ... rest } render = {(props) => user === "admin" ? (
        <Component {...props} />
) : (<Redirect to={{pathname: "/Login", state: { referer: props.location }}} /> )
}
    />
);
}

export default AdminRoute;