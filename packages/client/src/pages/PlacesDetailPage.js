import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { LoadingSpinner } from 'components';
import axios from 'util/axiosConfig.js';
import PlaceBox from 'components/PlaceBox'


export default function PlacesDetailPage({
    match: {
        params: { placeId },
    },

}) {
    const [mapMarker, setMapMarker] = useState()
    const [loading, setLoading] = useState(false)


    const getMarker = async () => {
        setLoading(true)

        try {
            const allMarkers = await axios.get('places')
            console.log(allMarkers)


            const marker = allMarkers.data.find((place) => place._id === placeId)
            setMapMarker(marker)
            console.log("doggie", marker)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error.message)
        }

    }


    // const findMapMarkerById = ()=>{
    //     console.log(mapMarkers)
    //     const marker = mapMarkers.find((place)=> place.id === placeId )
    //       console.log(marker)
    //       setMapMarkers(marker)
    // }


    useEffect(() => {
        console.log(placeId)
        getMarker()

        console.log(mapMarker)
    }, []);


    if (!mapMarker) {
        return (
            <Container className='h-100'>
                <LoadingSpinner full />
            </Container>
        )
    }


    return (
        <Container className='h-100'>


            <PlaceBox mapMarker={mapMarker} />


        </Container>
    )
}


