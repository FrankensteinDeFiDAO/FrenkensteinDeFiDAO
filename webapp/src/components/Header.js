import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import '../App.css';

function Header(props) {
    return (
        <>
            <Navbar variant="dark" className="header">
                <Container>
                    <Navbar.Brand variant="primary">&#128126; Frankenstein DeFi DAO</Navbar.Brand>
                    <Navbar.Text>
                        {
                            props.account
                                ? <><div>{props.account}</div> </>
                                : <div>Not Connected</div>
                        }
                    </Navbar.Text>
                </Container>
            </Navbar>

            <br />
            
            {props.account &&
                <>
                    <Link to={"/"} className="menuItem">Home</Link >
                    <Link to={"/robot"} className="menuItem">Create Robot</Link >
                    <Link to={"/manual"} className="menuItem">Create Manual</Link >
                    <Link to={"/vote"} className="menuItem">Vote</Link >
                    <Link to={"/accept"} className="menuItem">Accept</Link >
                </>
            }

        </>
    );
}

export default Header;