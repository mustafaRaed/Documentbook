import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from "./components/auth";
import Header from './Header';
import { Layout } from './components/Layout';
import Searchbar from './components/Searchbar';
import Home from './Home';
import Register from './Register';
import Lhome from './Lhome';
import Login from './Login';
import CoursePage from './components/CoursePage';
import Users from "./Users"
import ChangePassword from "./ChangePassword";
import resetPassword from "./ResetPassword"


function App(props) {
    const [user, setUser] = useState(null);
 //   const loggedIn = useMemo(() => ({user, setUser}), [user, setUser]);

        return (
            <React.Fragment>
            <Router>
                <AuthContext.Provider value={{user, setUser}}>

                    <Header />
                    <Searchbar/>
                    <hr/>
                    <Layout>
                        <Switch>
                            { user ? (<Route path="/" exact component={Lhome}/>) : ( <Route path="/" exact component={Home}/> ) }
                            <Route path="/Login" component={Login}/>
                            <Route path="/ChangePassword/:email" component={ChangePassword}/>
                            <Route path="/resetPassword" component={resetPassword}/>
                            <Route path="/Register" component={Register}/>
                            <PrivateRoute path="/course/:name" component={CoursePage}/>
                        </Switch>
                    </Layout>
                </AuthContext.Provider>
            </Router>
            </React.Fragment>
        );
}

export default App;
