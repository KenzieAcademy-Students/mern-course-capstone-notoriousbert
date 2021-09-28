import React from 'react'
import { Container } from 'react-bootstrap'
import { ErrorBoundary, LoadingSpinner } from 'components';
import { useAxios } from 'hooks';
import PlaceBox from 'components/PlaceBox'


export default function PlacesDetailPage({
match:{
    params: {placeId},
},

}) {
    const { data, loading, error } = useAxios({
        config: { url: `places/${placeId}`},
    })

    

    return (
        <Container className='h-100'>
            <ErrorBoundary>
                {error ? (
                    <p>Error...</p>
                ) : (
                  (() => {
                    switch (loading) {
                      case false:
                        return <PlaceBox place={data} />
                    case true:
                        return <LoadingSpinner full />
                    default:
                      return null
                    }
                  })()
                )}
            </ErrorBoundary>
        </Container>
    )
}


