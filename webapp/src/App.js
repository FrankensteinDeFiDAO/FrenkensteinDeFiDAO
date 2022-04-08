// SPDX-License-Identifier: BUSL-1.1
import React from 'react'
import NavigationBar from './components/NavigationBar';
import Body from './components/Body';
import { Container, Row, Col } from 'react-bootstrap'

function App() {
    const [account, setAccount] = React.useState("")

    return (
        <Container fluid="md">
            <Row>
                <Col>
                    <NavigationBar account={account} setAccount={setAccount}/>
                    <br />
                    <Body/>
                </Col>
            </Row>
        </Container>);
}

export default App;
