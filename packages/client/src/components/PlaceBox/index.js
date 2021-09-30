import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'




const PlaceBox = ({ mapMarker }) => {
  return (
    <Container className='p-sm-2 p-md-4'>
      <Row>
        <Col>
          <div className='row justify-content-left mb-2'>
            <div className='col-xs-8 col-md-7'>
              <h1>{mapMarker.placeName}</h1>
            </div>
          </div>
          <div className='row justify-content-left mb-2'>
            <div className='col-xs-8 col-md-7'>
              <h4>{mapMarker.typeofPlace}</h4>
            </div>
          </div>
          <div className='row justify-content-left mb-2'>
            <div className='col-xs-8 col-md-7'>
              <h3>{mapMarker.address} <br /> {mapMarker.city},{mapMarker.state} <br />{mapMarker.zipcode}</h3>
            </div>
          </div>
          <div className='row justify-content-left mb-2'>
            <div className='col-xs-8 col-md-7'>
              <h6>Pet's Allowed: {mapMarker.petsAllowed.map((pet, index) => (index === mapMarker.petsAllowed.length - 1 ? <>{pet.category}</> : <>{pet.category}, </>))} </h6>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='row justify-content-left mb-2'>
            <div className='col-xs-8 col-md-7'>
              <h2>Reviews <br />{mapMarker.reviews.map((review) => <div>
                <h4>
                  <Link to={`/users/${review.author.username}`}>{review.author.username}</Link> - {review.created}
                </h4>
                <div>
                  {review.text}
                </div>
              </div>)} </h2>
            </div>
          </div>

        </Col>
      </Row>


    </Container>
  )
}

export default PlaceBox
