import React, { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'



export default function SearchForm({ markers, setMarkers, getMarkers }) {

    const petsAllowedInitialState = {
        Reptile: false,
        Cat: false,
        Dog: false,
        Bird: false,
    }
    const typeofPlaceInitialState = {
        Restaurant: false,
        Bar: false,
        Hotel: false,
        Park: false,
    }


    const [typeofPlace, setTypeofPlace] = useState(typeofPlaceInitialState)

    const [petsAllowed, setPetsAllowed] = useState(petsAllowedInitialState)





    const filterByPets = (startingMarkers) => {
        if (!markers) {
            return
        }
        const filteredMarkers = startingMarkers.filter(marker => {
            let pets = []

            for (let pet of marker.petsAllowed) {
                pets.push(pet.category)
            }
            let petsSearchQuery = []
            for (let pet of Object.keys(petsAllowed)) {
                if (petsAllowed[pet]) {
                    petsSearchQuery.push(pet)
                }
            }
            let checker = (arr, target) => target.every(v => arr.includes(v))
            return checker(pets, petsSearchQuery)

        })
        console.log(filteredMarkers)
        setMarkers(filteredMarkers)
        return filteredMarkers

    }

    const filterByPlace = (startingMarkers) => {
        if (!markers) {
            return
        }
        const filteredMarkers = startingMarkers.filter(marker => {
            let noCaseTypeOfPlace;
            if (marker.typeOfPlace) {
                noCaseTypeOfPlace = marker.typeOfPlace.toLowerCase()
            } else {
                noCaseTypeOfPlace = marker.typeofPlace.toLowerCase()
            }

            let placeSearchQuery = []
            for (let place of Object.keys(typeofPlace)) {
                if (typeofPlace[place]) {
                    placeSearchQuery.push(place.toLowerCase())
                }
            }
            console.log(placeSearchQuery.includes(marker.typeofPlace), "search")
            return placeSearchQuery.includes(noCaseTypeOfPlace)
        })
        console.log(filteredMarkers)
        setMarkers(filteredMarkers)

    }


    const masterFilter = async () => {
        try {
            const startingMarkers = await getMarkers()
            const filteredMarkers = await filterByPets(startingMarkers)
            console.log(filteredMarkers, "places")
            filterByPlace(filteredMarkers)
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        masterFilter()
    }, [petsAllowed, typeofPlace])

    const handleCheckboxPets = (e) => {
        console.log('target', e)
        setPetsAllowed((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.checked
        }))
        console.log(petsAllowed)
    }

    const handleCheckboxPlaces = (e) => {
        console.log(e.target.id)
        setTypeofPlace((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.checked
        }))
        console.log(typeofPlace)
    }




    return (
        <Container>
            <Form>

                <div className='my-3'>
                    <Form.Check
                        //custom
                        type='checkbox'
                        id='Dog'
                        label='Dog'
                        checked={petsAllowed.Dog}
                        onChange={handleCheckboxPets}
                    />

                    <Form.Check
                        //custom
                        type='checkbox'
                        id='Cat'
                        label='Cat'
                        checked={petsAllowed.Cat}
                        onChange={handleCheckboxPets}
                    />
                    <Form.Check
                        //custom
                        type='checkbox'
                        id='Bird'
                        label='Bird'
                        checked={petsAllowed.Bird}
                        onChange={handleCheckboxPets}
                    />
                    <Form.Check
                        //custom
                        type='checkbox'
                        id='Reptile'
                        label='Reptile'
                        checked={petsAllowed.Reptile}
                        onChange={handleCheckboxPets}
                    />
                </div>

                <div>
                    <Form.Check
                        // custom
                        type='checkbox'
                        id='Bar'
                        label='Bar'
                        checked={typeofPlace.Bar}
                        onChange={handleCheckboxPlaces}
                    />
                    <Form.Check
                        // custom
                        type='checkbox'
                        id='Restaurant'
                        label='Restaurant'
                        checked={typeofPlace.Restaurant}
                        onChange={handleCheckboxPlaces}
                    />
                    <Form.Check
                        // custom
                        type='checkbox'
                        id='Park'
                        label='Park'
                        checked={typeofPlace.Park}
                        onChange={handleCheckboxPlaces}
                    />
                    <Form.Check
                        // custom
                        type='checkbox'
                        id='Hotel'
                        label='Hotel'
                        checked={typeofPlace.Hotel}
                        onChange={handleCheckboxPlaces}
                    />
                </div>
            </Form>
        </Container>
    )
}
