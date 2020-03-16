import React, {useState, Component, useContext} from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form, Input, Error } from "./components/authForm";
import {AuthContext, useAuth} from "./components/auth";
import Dialog from "react-bootstrap-dialog";


function ChangePassword(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [changedPassword, setChangedPassword] = useState(false);
    const [dialog, setDialog] = useState("");
    const {user, setUser} = useContext(AuthContext);
    const referer = props.location.state || '/';

    function passwordChanger() {
        const last = window.location.pathname;
        const part = last.substring(last.lastIndexOf('/') + 1);
        let userfrom = {
            email: userName,
            token: part,
            password: password,
            newPassword: newPassword,
            repeatPassword: repeatPassword,
        };

        axios.post("http://localhost:9000/users/updatePassword", userfrom )
            .then(res => {
                if(res.status === 200)
                    onChangedPassword();
            }).catch(error => {
                    console.log("Error: " + error);
        });
    }

    function onChangedPassword() {
        dialog.show({
            title: 'Uppdaterat',
            body: 'Ditt lösenord är nu uppdaterat och du kommer bli omdirigerad till inloggningssidan',
            actions: [
                Dialog.OKAction(() => setChangedPassword(true))
            ],
            bsSize: 'small',
            onHide: () => setChangedPassword(true)
        })

    }

    function handleSubmit() {
        if(newPassword === repeatPassword){
            passwordChanger();
        }
        else{
            dialog.show({
                title: 'Error',
                body: 'Nytt lösenord och repetera nytt lösenord stämmer inte överrens',
                actions: [
                    Dialog.OKAction()
                ],
                bsSize: 'small'
            })
        }
    }

    if(changedPassword){
        return <Redirect to="/Login" />;
    }

        return (
            <div>
            <Form className="mt-5">
    <h3>Ändra lösenord</h3>

        <div className="form-group">
            <label>Bekräfta emailadress</label>
            <Input type="email" id="password" className="form-control" placeholder="Email" value={userName} onChange={e => { setUserName(e.target.value);}}/>
        </div>

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

        <button onClick={handleSubmit} className="btn btn-secondary btn-block">Ändra lösenord</button>
        {/**      {isError && <Error>Användarnamn och lösenord stämmer inte överrens! </Error>} */}
        </Form>
        <Dialog ref={(component) => { setDialog(component)}} />
        </div>
        );
}

export default ChangePassword