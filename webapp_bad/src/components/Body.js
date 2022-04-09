import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { Accordion, Tabs, Tab, Button, Nav, NavItem, NavLink } from 'react-bootstrap';
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Link } from "react-router-dom";

function Body(props) {
    const [activeTab, setActiveTab] = useState("list");

    const onSelect = (key) => {
        setActiveTab(key);
    }

    const test = 'http://google.com';

    return (<>
        {/* <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Info</Accordion.Header>
                <Accordion.Body>
                    Just <a href="http://google.com" target="_blank" rel="noopener noreferrer">Google</a> it.
                </Accordion.Body>
            </Accordion.Item>
        </Accordion> */}

        {/* <Link to="/">home</Link>
        <Link to="/1">one</Link>
        <Link to="/2">two</Link> */}

        <br /><br />
        <Button className="btn-custom-primary">Test</Button>
        <br /><br />

        {/* <Tabs activeKey={activeTab} transition={false} id="noanim-tab-example" onSelect={onSelect}>
            <Tab eventKey="one" title="One">
                one
            </Tab>
            <Tab eventKey="two" title="Two">
                two
            </Tab>
            <Tab eventKey="three" title="Three">
                three
            </Tab>
        </Tabs> */}
    </>);
}

export default Body;

