import React, {useState, Component, useContext} from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form, Input, Error } from "./components/authForm";
import {AuthContext, useAuth} from "./components/auth";


function ChangePassword(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [failedLogin, setFailedLogin] = useState(false);
    const {user, setUser} = useContext(AuthContext);
    const referer = props.location.state || '/';

    function passwordChanger(e) {
        e.preventDefault();
        const last = window.location.pathname;
        const part = last.substring(last.lastIndexOf('/') + 1);
        console.log("Last part: " + part);
        let userfrom = {
            email: part,
            password: password,
            newPassword: newPassword,
            repeatPassword: repeatPassword,
        };

        axios.post("http://localhost:9000/users/updatePassword", userfrom )
            .then(res => {
                if(res.status === 200)
                    console.log("User update password success");

            }).catch(error => {
                    console.log("Error: " + error);
        });
    }

        return (
            <div>
            <Form className="mt-5">
    <h3>Ändra lösenord</h3>

        <div className="form-group">
            <label>Nuvarande lösenord</label>
            <Input type="password" id="password" className="form-control" placeholder="Nuvarande lösenord" value={password} onChange={e => { setPassword(e.target.value);}}/>
        </div>

        <div className="form-group">
            <label>Nytt lösenord</label>
            <Input type="password" id="newPassword" className="form-control" placeholder="Nytt lösenord" value={newPassword} onChange={e => { setNewPassword(e.target.value);}}/>
        </div>

        <div className="form-group">
            <label>Repetera nytt lösenord</label>
        <Input type="password" id="repeatPassword" className="form-control" placeholder="Repetera nytt lösenord" value={repeatPassword} onChange={e => { setRepeatPassword(e.target.value);}}/>
        </div>

        <button onClick={passwordChanger} className="btn btn-secondary btn-block">Ändra lösenord</button>
        {/**      {isError && <Error>Användarnamn och lösenord stämmer inte överrens! </Error>} */}
        </Form>
        </div>
        );
}

export default ChangePassword