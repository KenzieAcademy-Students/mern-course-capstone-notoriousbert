import React from 'react'
import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col, Button } from 'react-bootstrap'

export default function LandingPage(props) {
return (
    <div>
    <Container fluid>
        <Row>
            {/* <p> Row one </p> */}
            <Col>
            <p> Col One</p>
            </Col>
        </Row>
        <Row>
            {/* <p> Row Two </p> */}
            <Col> One - About K/R </Col>
            <Col> Two - Our Mission </Col>
            <Col> Three - Contact US</Col>
        </Row>
    </Container>
    </div>
)}
