import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import monster from '../utils/monster.png';
import React from "react";
import '../App.css';

function Home(props) {
    return (<>
        <img src={monster} alt='Frankenstein DeFi DAO' style={{width: "100px"}} />
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
        </div>
    </>);
}

export default Home;

