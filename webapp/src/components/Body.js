// SPDX-License-Identifier: BUSL-1.1
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Accordion, Tabs, Tab } from 'react-bootstrap'

function Body(props) {
    const [activeTab, setActiveTab] = useState("list");
    
    const onSelect = (key) => {
        setActiveTab(key);
    }

    return (<>
        <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion</Accordion.Header>
            <Accordion.Body>
                woops
            </Accordion.Body>
        </Accordion.Item>
        </Accordion> 

        <br/><br/><br/>

        <Tabs activeKey={activeTab} transition={false} id="noanim-tab-example" onSelect={onSelect}>
            <Tab eventKey="one" title="One">
                one
            </Tab>
            <Tab eventKey="two" title="Two">
                two
            </Tab>
            <Tab eventKey="three" title="Three">
                three
            </Tab>
        </Tabs>
    </>);
}

export default Body;

