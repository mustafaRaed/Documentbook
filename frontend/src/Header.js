import React, {useContext } from 'react';
import {Link} from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'
import {AuthContext} from "./components/auth";
import Cookies from 'js-cookie'

const Styles = styled.div`
.navbar {
    background-color: white;
    margin-right: 10px;
}

.navbar-brand, .navbar-nav .nav-link {
    color: #222;
    margin: 2px;
    
    &:hover {
        color: #454545;
    }
    
}
`;

function Header() {

    const {user, setUser} = useContext(AuthContext);

    return(
        <Styles>
            <Navbar expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item><Nav.Link as={Link} to="/">Hem </Nav.Link></Nav.Item>
                        { user === "admin" ? (<Nav.Item><Nav.Link as={Link} to="/Register">Hantera användare</Nav.Link></Nav.Item> ) : null }
                        { user ? (<Nav.Item><Nav.Link as={Link} to="/Search">Sök</Nav.Link></Nav.Item> ) : null }
                        { user ? (<Nav.Item><Nav.Link as={Link} to="/" onClick={() =>{ setUser(null); Cookies.remove("role")}}>Logout</Nav.Link></Nav.Item>) : (<Nav.Item><Nav.Link as={Link} to="/Login">Login</Nav.Link></Nav.Item> )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
)
}

export default Header

