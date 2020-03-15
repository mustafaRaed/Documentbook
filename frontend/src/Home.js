import React, {Component, useContext, useMemo} from 'react';
import './App.css'
import { AuthContext } from "./components/auth";

function Home() {
    const {user, setUser} = useContext(AuthContext);
        return (
            <div className="App">
                <h2>Välkommen!</h2>
                <p className="App">Vänligen logga in för att komma vidare</p>
            </div>
        );
}

export default Home;