import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link, Routes, Route } from "react-router-dom";
import '../App.css';

function Header(props) {
    return (
        <>
                <Navbar variant="dark" className="header">
                    <Container>
                        <Navbar.Brand variant="primary" as={Link} to="/">&#128126; Frankenstein DeFi DAO</Navbar.Brand>
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
                <Route path="/execute" element={props.account &&
                    <>
                        <Link to={"/robot"} className="menuItem">Create Robot</Link >
                        <Link to={"/manual"} className="menuItem">Create Manual</Link >
                        <Link to={"/vote"} className="menuItem">Vote</Link >
                        <Link to={"/execute"} className="menuItem">Execute</Link >
                    </>
                } />

                <Route path="/vote" element={props.account &&
                    <>
                        <Link to={"/robot"} className="menuItem">Create Robot</Link >
                        <Link to={"/manual"} className="menuItem">Create Manual</Link >
                        <Link to={"/vote"} className="menuItem">Vote</Link >
                        <Link to={"/execute"} className="menuItem">Execute</Link >
                    </>
                } />

                <Route path="/manual" element={props.account &&
                    <>
                        <Link to={"/robot"} className="menuItem">Create Robot</Link >
                        <Link to={"/manual"} className="menuItem">Create Manual</Link >
                        <Link to={"/vote"} className="menuItem">Vote</Link >
                        <Link to={"/execute"} className="menuItem">Execute</Link >
                    </>
                } />

                <Route path="/robot" element={props.account &&
                    <>
                        <Link to={"/robot"} className="menuItem">Create Robot</Link >
                        <Link to={"/manual"} className="menuItem">Create Manual</Link >
                        <Link to={"/vote"} className="menuItem">Vote</Link >
                        <Link to={"/execute"} className="menuItem">Execute</Link >
                    </>
                } />

            </Routes>



        </>
    );
}

export default Header;