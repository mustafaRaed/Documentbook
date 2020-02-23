import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './Header';
import { Layout } from './components/Layout';
import Searchbar from './components/Searchbar';
import Home from './Home';
import Lhome from './Lhome';
import Login from './Login';
import Dokument from './Dokument';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <React.Fragment>
                <Header />
                <Searchbar/>
                <hr/>
                <Layout>
                    <Router>
                        <Switch>
                    /**        <Route path="/" exact component={Home}/> */
                            <Route path="/" exact component={Lhome}/>
                            <Route path="/Login" component={Login}/>
                            <Route path="/Dokument" component={Dokument}/>
                        </Switch>
                    </Router>
                </Layout>
            </React.Fragment>
        );
    }
}

export default App;