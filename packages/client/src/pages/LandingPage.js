import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Image, InputGroup, FormControl } from 'react-bootstrap'

const Landing = () => {
return (
  <div>
  <Container fluid>
      <Row>
      {/* <p> Row one </p> */}
      <Col style={{/*border:"2px solid black",*/ height:350}}>
      <div>
        <h1><Image src="holder.js/171x180" rounded />Kibbles & Ritz</h1>
        <p> Find pet friendly bars, hotels, restaurants wherever you're traveling</p>
          <div>
            <InputGroup className="mb-3">
              <FormControl
                  placeholder="Enter a city, zip code, or address"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  />
                  <InputGroup.Text id="basic-addon2">Get Started!</InputGroup.Text>
                </InputGroup>
                </div>
              </div>
        </Col>
      </Row>
      <Row>
        <Col style={{/*border:"2px solid black",*/ height:120, fontSize:13}}><Image src="holder.js/171x180" rounded/><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum sapien et nibh condimentum maximus.</p></Col>
        <Col style={{/*border:"2px solid black".*/ height:120, fontSize:13}}><Image src="holder.js/171x180" rounded/><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum sapien et nibh condimentum maximus.</p></Col>
        <Col style={{/*border:"2px solid black",*/ height:120, fontSize:13}}><Image src="holder.js/171x180" rounded/><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum sapien et nibh condimentum maximus.</p></Col>
      </Row>
    </Container>
  </div>
)}

export default Landing