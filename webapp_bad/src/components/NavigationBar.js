import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css';
import { Container, Navbar } from 'react-bootstrap'
import Account from './Account'

function NavigationBar(props) {
    return (
        <Navbar variant="dark" className="header">
            <Container>
                <Navbar.Brand variant="primary">&#128126; Frankenstein DeFi DAO</Navbar.Brand>
                <Navbar.Text> 
                    <Account/>
                </Navbar.Text>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;