import React from 'react';
import './App.css'
import { AuthContext } from "./components/auth";

function Home() {
        return (
            <div className="App">
                <h2>Välkommen!</h2>
                <p className="App">Vänligen logga in för att komma vidare</p>
            </div>
        );
}

export default Home;