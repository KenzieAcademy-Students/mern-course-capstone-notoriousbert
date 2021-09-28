import React from 'react'
import { Container, Image, Figure } from 'react-bootstrap'




const PlaceBox = ({place}) => {
    return (
        <Container className='p-sm-2 p-md-4'>
          <div className='row justify-content-center mb-2'>
            <div className='col-xs-8 col-md-7'>
              <Image width='100%' src={`/${place.placeImage}`} />
        </div>
      </div>
      <div className='row h-25 justify-content-center'>
        <div className='col-xs-8 col-md-7'>
          <div className='row h-25'>
            <div className='col-6 align-self-center'>
              <h4>{place.name}</h4>
            </div>
            <div className='col-6 align-self-center text-right mb-2'>
              <div className='text-secondary'>
                <h3>{place.typeOfPlace}</h3>
              </div>
            </div>
            <div className='col-12 align-self-center mb-3'>
              <Figure.Caption>{place.description} </Figure.Caption>
            </div>
          </div>
        </div>
      </div>
      
    </Container>
    )
}

export default PlaceBox
