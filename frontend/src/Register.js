import React, { useState, useEffect } from 'react';
import {Table, Card } from 'react-bootstrap'
import Dialog from 'react-bootstrap-dialog'
import axios from "axios";
import { RegisterForm, EditForm, Input, Error, Div1, Div2, Div3, Wrapper, Buttons } from "./components/authForm";
import { useAuth } from "./components/auth";

function Register() {
    const [userName, setUserName] = useState("");
    const [editUser, setEditUser] = useState("");
    const [email, setEmail] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [dialog, setDialog] = useState("");
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:9000/users")
            .then(res => {
                         setUsers(res.data);
            }).catch((error) => {
            console.log(error);
        })
    });

    function registerUser(e) {
        e.preventDefault();
        let randomPassword = Math.random().toString(36).slice(-8);
        console.log(randomPassword);
        let userfrom = {
            name: userName,
            email: email,
            password: randomPassword,
        };

        axios.post("http://localhost:9000/users/add", userfrom )
            .then(res => {
                if(res.status === 200) {
                    setUserName("");
                    setEmail("");
                }
            }).catch(error => {
            console.log(error);
        });
    }

    function onClickEdit(id) {
        let userfrom = {
            name: editUser,
            editUser: userName,
            email: editEmail,
            editEmail: email,
        };
        console.log("Namn: " + editUser + " EditName: " + userName + " Email: " + editEmail + " editEmail: " + email)

        axios.post("http://localhost:9000/users/updateUser", userfrom )
            .then(res => {
                if(res.status === 200) {
                    setUserName("");
                    setEmail("");
                    setEditUser("");
                    setEditEmail("");
                    setShow(false);
                }
            }).catch(error => {
            console.log(error);
        });
    }

    function onClickDelete(id) {
        dialog.show({
            title: 'Delete user',
            body: 'Är du säker på att du vill ta bort denna användare?',
            actions: [
                Dialog.OKAction(() => deleteUser(id)),
                Dialog.CancelAction()
            ],
            bsSize: 'small'
        })
    }

    function deleteUser(id) {
        axios.delete('http://localhost:9000/users/'+id)
            .then(res => console.log(res.data));
               setUsers(users.filter(el => el._id !== id));
    }

    return (
        <Wrapper>
            <Div1>
                <h5 className="mt-5">Registrerade användare</h5>
                <Table size="sm" borderless="true">
                    <tbody>
                    {users.map((e) => (
                        <tr key={e._id}>
                            <td>{e.name}</td>
                            <td><a href="#" onClick={() => {setShow(true); setUserName(e.name); setEmail(e.email); setEditUser(e.name); setEditEmail(e.email)}}>Edit</a> | <a href="#" onClick={() => {onClickDelete(e._id)}}>Delete</a></td>
                            <Dialog ref={(component) => { setDialog(component)}} />
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Div1>
    {show ?
    <Div3>
    <Card className="mt-5">
        <Card.Header>Hantera användare</Card.Header>
    <Card.Body>
    <EditForm>
    <div className="form-group">
        <label>Användarnamn</label>
        <Input type="text" id="text" className="form-control" placeholder="E-post" value={userName} onChange={e => {setUserName(e.target.value);}}/>
    </div>
    <div className="form-group">
        <label>E-post:</label>
    <Input type="email" id="email" className="form-control" placeholder="E-post" value={email} onChange={e => {setEmail(e.target.value);}}/>
    </div>
    <Buttons>
    <button onClick={() => {setShow(false); setUserName(""); setEmail("")}} className="d-inline float-left btn btn-secondary">Avbryt</button>
        <button onClick={onClickEdit} className="d-inline float-right btn btn-secondary">Ändra</button>
        </Buttons>
        </EditForm>
        </Card.Body>
        </Card>
        </Div3> :
                <Div2>
                    <Card className="mt-5">
                        <Card.Header>Registrera ny användare</Card.Header>
                        <Card.Body>
                            <RegisterForm>
                                <div className="form-group">
                                    <label>Användarnamn</label>
                                    <Input type="text" id="name" className="form-control" placeholder="Användarnamn" value={userName} onChange={e => {setUserName(e.target.value);}}/>
                                </div>

                                <div className="form-group">
                                    <label>E-post</label>
                                    <Input type="email" id="email" className="form-control" placeholder="E-post" value={email} onChange={e => {setEmail(e.target.value);}}/>
                                </div>

                                <button onClick={registerUser} className="btn btn-secondary btn-block">Registrera</button>
                                <p className="forgot-password text-right" />
                                {/**      {isError && <Error>Användarnamn och lösenord stämmer inte överrens! </Error>} */}
                            </RegisterForm>
                        </Card.Body>
                    </Card>
                </Div2> }
        </Wrapper>
)
}

export default Register