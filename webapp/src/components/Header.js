import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link, Routes, Route } from "react-router-dom";
import monster from '../utils/monster.png';
import '../App.css';

function Header(props) {
    return (
        <>
            <Navbar variant="dark" className="header">
                <Container>
                    <Navbar.Brand variant="primary" as={Link} to="/">
                        <img src={monster} alt='Frankenstein DeFi DAO' style={{ width: "50px" }} />
                        Frankenstein DeFi DAO
                    </Navbar.Brand>
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

            <Routes>
                <Route path="/" element={props.account &&
                    <></>
                } />
                <Route path="/execute" element={props.account &&
                    <>
                        <Link to={"/manual"} className="menuItem">Create Manual</Link >
                        <Link to={"/robot"} className="menuItem">Create Robot</Link >
                        <Link to={"/vote"} className="menuItem">Vote</Link >
                        <Link to={"/remove"} className="menuItem">Remove</Link >
                    </>
                } />

                <Route path="/vote" element={props.account &&
                    <>
                        <Link to={"/manual"} className="menuItem">Create Manual</Link >
                        <Link to={"/robot"} className="menuItem">Create Robot</Link >
                        <Link to={"/execute"} className="menuItem">Execute</Link >
                        <Link to={"/remove"} className="menuItem">Remove</Link >
                    </>
                } />

                <Route path="/manual" element={props.account &&
                    <>
                        <Link to={"/robot"} className="menuItem">Create Robot</Link >
                        <Link to={"/vote"} className="menuItem">Vote</Link >
                        <Link to={"/execute"} className="menuItem">Execute</Link >
                        <Link to={"/remove"} className="menuItem">Remove</Link >
                    </>
                } />

                <Route path="/robot" element={props.account &&
                    <>
                        <Link to={"/manual"} className="menuItem">Create Manual</Link >
                        <Link to={"/vote"} className="menuItem">Vote</Link >
                        <Link to={"/execute"} className="menuItem">Execute</Link >
                        <Link to={"/remove"} className="menuItem">Remove</Link >
                    </>
                } />

                <Route path="/remove" element={props.account &&
                    <>
                        <Link to={"/manual"} className="menuItem">Create Manual</Link >
                        <Link to={"/robot"} className="menuItem">Create Robot</Link >
                        <Link to={"/vote"} className="menuItem">Vote</Link >
                        <Link to={"/execute"} className="menuItem">Execute</Link >
                    </>
                } />

            </Routes>



        </>
    );
}

export default Header;