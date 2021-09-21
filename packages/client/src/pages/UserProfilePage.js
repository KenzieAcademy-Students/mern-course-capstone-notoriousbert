import React from 'react'
import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col, Button, Image, InputGroup, FormControl, Form } from 'react-bootstrap'

export default function UserProfilePage(props) {
return (
    <div>
    <Container fluid>
        <Row style={{height:350, /*border:"1px solid black"*/}}>
        <Image src="holder.js/171x180" roundedCircle />
        <div>
            <h1><Image src="holder.js/171x180" roundedCircle />Kibbles & Ritz</h1>
        </div>
        <div className='signupForm' style={{width:"40%", margin:"auto", height:500}}>
            <span style={{fontSize:12}}>REGISTER</span>
        <Form size="sm">
            <Form.Group size="sm" className="d-flex flex-column input-sm" controlId="formBasicEmail">
                <Form.Label size="sm">Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" size="sm" />
            </Form.Group>
        
            <Form.Group className="d-flex flex-column input-sm" controlId="formBasicPassword">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Username" />
            </Form.Group>
            <Form.Group className="d-flex flex-column input-sm" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="d-flex flex-column input-sm" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="confirm password" placeholder="Confirm Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Register
            </Button>
            </Form>
            </div>
        </Row>
        <Row style= {{height:125, /*border: "1px solid black"*/}}>
        </Row>
    </Container>
    </div>
)}
