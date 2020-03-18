import React, {useState, Component, useContext} from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ResetForm, Label, Input, Error } from "./components/authForm";
import {AuthContext, useAuth} from "./components/auth";


function ResetPassword(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [failedLogin, setFailedLogin] = useState(false);
    const {user, setUser} = useContext(AuthContext);
    const referer = props.location.state || '/';

    function passwordChanger(e) {
        e.preventDefault();
        let randomPassword = Math.random().toString(36).slice(-8);
        let userfrom = {
            email: email,
            password: randomPassword,
        };

        axios.post("http://localhost:9000/users/reset", userfrom )
            .then(res => {
                if(res.status === 200)
                    console.log("User reset password success");

            }).catch(error => {
            console.log("Error: " + error);
        });
    }

    return (
        <div>
            <ResetForm className="mt-5">
            <h4>Återställ lösenord</h4>

            <div className="resetForm">
                <Label>Ange din registrerade e-postadress för att skicka en länk med instruktioner för att återställa lösenord</Label>
                <Input type="email" id="email" className="form-control" placeholder="E-post" value={email} onChange={e => { setEmail(e.target.value);}}/>
            </div>

            <button onClick={passwordChanger} className="btn btn-secondary btn-block">Skicka inloggningslänk</button>
            {/**      {isError && <Error>Användarnamn och lösenord stämmer inte överrens! </Error>} */}
            </ResetForm>
        </div>
);
}

export default ResetPassword