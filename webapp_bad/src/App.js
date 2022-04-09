// SPDX-License-Identifier: BUSL-1.1
import React from 'react'
import NavigationBar from './components/NavigationBar';
import Body from './components/Body';
import { Container, Row, Col } from 'react-bootstrap'
// import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Routes, Route, Link } from "react-router-dom";


function Screen1() {
    return (<div>screen 1</div>)
}

function Screen2() {
    return (<div>screen 2</div>)
}

function App() {
    const [account, setAccount] = React.useState("")

    return (
        // <Container fluid="md">
        //     <Row>
        //         <Col>
        //             <NavigationBar account={account} setAccount={setAccount} />


        //             <br />

        //             {/* <Body/> */}
        //         </Col>
        //     </Row>
        // </Container>
        <BrowserRouter>
            {/* <Routes>
                            <Route path="/" element={<Body />} />
                            <Route path="/1" element={<Screen1 />} />
                            <Route path="/2" element={<Screen2 />} />
                        </Routes> */}
        </BrowserRouter>
    );
}

export default App;
