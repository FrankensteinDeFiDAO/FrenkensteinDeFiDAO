import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from 'react-bootstrap';
import monster from '../utils/monster.png';
import React from "react";
import '../App.css';

// test test test test test test test test test test test junk

function Home(props) {
    return (<>

        <Container fluid style={{maxWidth:"40rem"}}>
            <Row>
                <Col><img src={monster} alt='Frankenstein DeFi DAO' style={{ width: "220px", marginTop:"3rem" }} className="monster-img" /></Col>
                <Col>
                    <div>

                        <Link to="/manual">
                            <Button className="fix-btn">
                                Create Manual
                            </Button>
                        </Link>

                        <br />

                        <Link to="/robot">
                            <Button className="fix-btn">
                                Create Robot
                            </Button>
                        </Link>

                        <br />
                        <br />


                        <Link to="/vote">
                            <Button className="fix-btn">
                                Vote
                            </Button>
                        </Link>

                        <br />

                        <Link to="/execute">
                            <Button className="fix-btn">
                                Execute
                            </Button>
                        </Link>

                        <br />

                        <Link to="/remove">
                            <Button className="fix-btn">
                                Remove
                            </Button>
                        </Link>
                        
                    </div></Col>
            </Row>
        </Container>

        {/* <img src={monster} alt='Frankenstein DeFi DAO' style={{width: "100px"}} className="monster-img"/>
        <br />
        <br />
        <div>
            <Link to="/robot">
                <Button className="fix-btn">
                    Create Robot
                </Button>
            </Link>

            <br />

            <Link to="/manual">
                <Button className="fix-btn">
                    Create Manual
                </Button>
            </Link>

            <br />
            <br />


            <Link to="/vote">
                <Button className="fix-btn">
                    Vote
                </Button>
            </Link>

            <br />

            <Link to="/execute">
                <Button className="fix-btn">
                    Execute
                </Button>
            </Link>
        </div> */}
    </>);
}

export default Home;

