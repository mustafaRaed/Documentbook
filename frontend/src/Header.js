import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
.navbar {
    background-color: white;
    margin-right: 10px;
}

.navbar-brand, .navbar-nav .nav-link {
    color: #222;
    
    &:hover {
        color: #454545;
    }
    
}
`;

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true,
            isAdmin: true
        }
    }

    setLogin = () => {
        this.setState(prevState => ({
            loggedIn: !prevState.loggedIn
        }));
    }


    render(){
    return(
        <Styles>
            <Navbar expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item><Nav.Link href="/">Hem</Nav.Link></Nav.Item>
                        {this.state.loggedIn ?
                            <Nav.Item><Nav.Link href="/dokument">Hantera dokument<span
                                className="badge badge-pill badge-danger">1</span></Nav.Link></Nav.Item> : null }
                        {this.state.loggedIn && this.state.isAdmin ?
                            < Nav.Item > < Nav.Link href="/kurser">Hantera kurser</Nav.Link></Nav.Item> :null }
                        { this.state.loggedIn ?
                            <Nav.Item><Nav.Link onClick={this.setLogin} href="/">Logga ut</Nav.Link></Nav.Item> :null }
                        { this.state.loggedIn ?
                            null : <Nav.Item><Nav.Link onClick={this.setLogin} href="/Login">Logga in</Nav.Link></Nav.Item> }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
)
}
}

export default Header

