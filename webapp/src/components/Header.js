import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import '../App.css';

// import 'bootstrap/dist/css/bootstrap.css'
import '../App.css';

// import Account from './Account'

function Header(props) {
    return (
        <Navbar variant="dark" className="header">
            <Container>
                <Navbar.Brand variant="primary">&#128126; Frankenstein DeFi DAO</Navbar.Brand>
                <Navbar.Text> 
                    {
                        props.account 
                            ? <><div>Account: {props.account}</div><div>on {props.chain}</div> </>
                            : <div>Not Connected</div>
                    }
                </Navbar.Text>
            </Container>
        </Navbar>
    );
}

export default Header;