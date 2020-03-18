import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute'
import { AuthContext } from "./components/auth";
import Header from './Header';
import { Layout } from './components/Layout';
import Searchbar from './components/Searchbar';
import Home from './Home';
import Register from './Register';
import Lhome from './Lhome';
import Login from './Login';
import CoursePage from './components/CoursePage';
import Cookies from 'js-cookie'
import ChangePassword from "./ChangePassword";
import resetPassword from "./ResetPassword"
import Search from "./Search"


function App(props) {
    const [user, setUser] = useState(null);

    const readCookie = () => {
        const userCookie = Cookies.get("role");
        if (userCookie) {
            setUser(userCookie);
        }
    }

    React.useEffect(() => {
        readCookie();
    }, [])

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
                            <AdminRoute path="/Register" component={Register}/>
                            <PrivateRoute path="/course/:name" component={CoursePage}/>
                            <PrivateRoute path="/Search" component={Search}/>
                        </Switch>
                    </Layout>
                </AuthContext.Provider>
            </Router>
            </React.Fragment>
        );
}

export default App;
