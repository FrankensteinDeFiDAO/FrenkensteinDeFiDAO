import React, { useState } from "react";
import '../App.css';
import { Accordion, Tabs, Tab, Button, Nav, NavItem, NavLink } from 'react-bootstrap';

function Home(props) {
    const [activeTab, setActiveTab] = useState("list");

    const onSelect = (key) => {
        setActiveTab(key);
    }

    const test = 'http://google.com';

    return (<>
        <br />
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

export default Home;

