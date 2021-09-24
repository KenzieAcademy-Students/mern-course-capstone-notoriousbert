import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Container } from 'react-bootstrap'

export default function PlacesDetailPage({
match:{
    params: {placeId},
},

}) {
    const [place, setPlace] = useState([]);

    useEffect(()=>{
         Axios.get(`api/place/places_by_id?id=${placeId}&type=single`)
         .then(response =>{
             setPlace(response.data[0])

         })
    },[])

    return (
        <div>
            
        </div>
    )
}


