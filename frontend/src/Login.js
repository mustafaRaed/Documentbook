import React, {useState, useContext} from 'react';
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { Form, Input } from "./components/authForm";
import {AuthContext} from "./components/auth";

function Login(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [failedLogin, setFailedLogin] = useState(false);
    const {user, setUser} = useContext(AuthContext);
    const referer = props.location.state || '/';

    function loginToPage(e) {
        e.preventDefault();
        let userfrom = {
            email: userName,
            password: password,
        };

        console.log("username: " + userName + " password: " + password);

        axios.post("http://localhost:9000/users/login", userfrom )
            .then(res => {
                if (res.status === 200){
                    setUser(res.status);
                    console.log("Login success")
                }

            }).catch(error => {
                setFailedLogin(true);
        });
    }

    if(user){
        return <Redirect to="/Admin" />;
    }

    return (
        <div>
        <Form className="mt-5">
<h3>Logga in</h3>

    <div className="form-group">
        <label>Användarnamn</label>
        <Input type="email" id="email" className="form-control" placeholder="Användarnamn" value={userName} onChange={e => { setUserName(e.target.value);}}/>
    </div>

    <div className="form-group">
        <label>Lösenord</label>
        <Input type="password" id="password" className="form-control" placeholder="Lösenord" value={password} onChange={e=>{ setPassword(e.target.value);}}/>
    </div>

    <div className="form-group">
        <div className="custom-control custom-checkbox">
        <Input type="checkbox" className="custom-control-input" id="customCheck1"/>
        <label className="custom-control-label" htmlFor="customCheck1">Spara
    inloggningsuppgifter</label>
    </div>
    </div>

    <button onClick={loginToPage} className="btn btn-secondary btn-block">Logga in</button>
        <p className="forgot-password text-right">
        Glömt <Link to="/resetPassword">lösenord?</Link>
    </p>
    { failedLogin ? <p style={{color:'red'}}> Inloggningen misslyckades, försök igen. </p> : null }
    </Form>
    </div>
    );
}

export default Login
