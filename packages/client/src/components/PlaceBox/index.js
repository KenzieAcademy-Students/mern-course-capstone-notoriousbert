import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'




const PlaceBox = ({ mapMarker }) => {
  useEffect(() => {
    console.log("snake", mapMarker)
  }, [])
  return (
    <Container className='p-sm-2 p-md-4'>
      <div className='row justify-content-left mb-2'>
        <div className='col-xs-8 col-md-7'>
          <h1>{mapMarker.placeName}</h1>
        </div>
      </div>
      <div className='row h-25 justify-content-left'>
        <div className='col-xs-8 col-md-7'>
          <div className='row h-25'>
            <div className='col-6 align-self-left'>
              <h4>{mapMarker.typeofPlace}</h4>
            </div>
            <div className='col-6 align-self-left text-right mb-2'>
              <div className='text-secondary'>
                <h3>{mapMarker.address}, {mapMarker.city}, {mapMarker.state}, {mapMarker.zipcode}</h3>
              </div>
            </div>
            <div className='col-12 align-self-center mb-3'>
              <h4>Pet's Allowed: {mapMarker.petsAllowed.map((pet, index) => (index === mapMarker.petsAllowed.length - 1 ? <>{pet.category}</> : <>{pet.category}, </>))} </h4>
            </div>
          </div>
        </div>
      </div>

    </Container>
  )
}

export default PlaceBox
