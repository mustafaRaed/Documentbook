import React, { Component } from 'react';
import axios from "axios";
import './App.css';

class Login extends Component {

    loginToPage(e) {
        e.preventDefault();
        let request = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }
        axios.post('http://localhost:5000/login', request)
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        return (
            <form className="loginForm mt-5" onSubmit={(e) => this.loginToPage(e)}>
                <h3>Logga in</h3>

                <div className="form-group">
                    <label>Användarnamn</label>
                    <input type="email" id="email" className="form-control" placeholder="Användarnamn" />
                </div>

                <div className="form-group">
                    <label>Lösenord</label>
                    <input type="password" id="password" className="form-control" placeholder="Lösenord" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Spara inloggningsuppgifter</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-secondary btn-block">Logga in</button>
                <p className="forgot-password text-right">
                    Glömt <a href="#">lösenord?</a>
                </p>
            </form>
        )
    }
}

export default Login
