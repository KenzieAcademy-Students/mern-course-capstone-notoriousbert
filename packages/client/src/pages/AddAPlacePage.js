import React, { useEffect, useState } from "react";
import axios from "util/axiosConfig.js";
import { toast } from 'react-toastify'

export default function AddAPlacePage() {
<<<<<<< HEAD
	const [petsAllowedCheck, setPetsAllowedCheck] = useState({
		cats: false,
=======
	const [petsAllowed, setPetsAllowed] = useState({
		Reptile: 'r',
    cats: false,
    Cat: 'c',
>>>>>>> 0b5f03aa6834f9960980669e2c1da684b9d71860
		dogs: false,
    Dog: 'd',
		reptiles: false,
    
		birds: false,
    Bird: 'b',
	});

	const handleCheckBox = (e) => {
		setPetsAllowedCheck({
			...petsAllowedCheck,
			[e.target.name]: e.target.checked,
		});
	};
	const [values, setValues] = useState({
		placeName: "",
		typeOfPlace: "None",
		address: "",
		petsAllowed: "",
		description: "",
		aptOrSuiteNumber: "",
		city: "",
		state: "",
		zipCode: "",
		pricePerNight: "",
	});

  const getPets = async () => {
    try {
      const pets = await axios.get('pets')
      console.log(pets)
      for (const pet of pets.data) {
        console.log(pet.category)
        console.log(petsAllowed[pet.category])
        let test = petsAllowed
        
        console.log('test:', test)
        setPetsAllowed({
          ...petsAllowed,
          [pet.category]: pet._id})
      }
    } catch (err) {
      toast.error(`couldn't get pets`)
    }
  }

  useEffect(() => {
    getPets()
  }, [])

	const handleChange = (e) => {
		console.log(e);
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
		console.log(values);
	};
	const handleSubmit = async (e) => {
    console.log(petsAllowed)
    e.preventDefault();
        e.stopPropagation();
		const {
			typeOfPlace,
			placeName,
			address,
			aptOrSuitNumber,
			city,
			state,
			zipcode,
			pricePerNight,
		} = values;
<<<<<<< HEAD

        const { petsAllowed } = petsAllowedCheck
		e.preventDefault();
		axios.post("/places", {
			typeOfPlace,
			placeName,
			address,
			aptOrSuitNumber,
			city,
			state,
			zipcode,
			pricePerNight,
			petsAllowed,
		});
=======
    console.log(	'typeOfPlace:', typeOfPlace,
    'placeName:',placeName,
    'address:',address,
    'aptNumber:',aptOrSuitNumber,
    'city:',city,
		'state:',	state,
    'zip:',zipcode,
    'pricePerNight:',pricePerNight)
    console.log(petsAllowed)
    try{
      const aPlace = await axios.post("/places", {
        typeOfPlace,
        placeName,
        address,
        aptOrSuitNumber,
        city,
        state,
        zipcode,
        pricePerNight,
        petsAllowed,
      }); 
      toast.success("Place was created!")
    }catch(err){
      toast.error("Unable to submit new place")
    }
>>>>>>> 0b5f03aa6834f9960980669e2c1da684b9d71860
	};
	return (
		<div className='form-container'>
			<h1>Add a place</h1>
			<form onSubmit={(e) => handleSubmit(e)} className='place-form'>
				<label>
					Place Name:
					<input
						type='text'
						name='placeName'
            required
						value={values.placeName}
						onChange={handleChange}
					/>
				</label>
				<label>
					Place Type:
					<select
						name='typeOfPlace'
            required
						id='places'
						value={values.typeOfPlace}
						onChange={handleChange}
					>
						<option value='none'>None</option>
						<option value='restaurant'>Restaurants</option>
						<option value='hotel'>Hotels</option>
						<option value='parks'>Parks</option>
					</select>
				</label>
				<label>
					Address:
					<input
						type='text'
						name='address'
            required
						value={values.address}
						onChange={handleChange}
					/>
				</label>
				<label>
					Cats:
					<input
						type='checkbox'
						name='cats'
						checked={petsAllowedCheck.cats}
						onChange={handleCheckBox}
					/>
				</label>
				<label>
					Dogs:
					<input
						type='checkbox'
						name='dogs'
						checked={petsAllowedCheck.dogs}
						onChange={handleCheckBox}
					/>
				</label>
				<label>
					Reptiles:
					<input
						type='checkbox'
						name='reptiles'
						checked={petsAllowedCheck.reptiles}
						onChange={handleCheckBox}
					/>
				</label>
				<label>
					Birds:
					<input
						type='checkbox'
						name='birds'
						checked={petsAllowedCheck.birds}
						onChange={handleCheckBox}
					/>
				</label>
				<label>
					Description (optional):
					<input
						type='text'
						name='description'
						value={values.description}
						onChange={handleChange}
					/>
				</label>
				<label>
					apt or suite number:
					<input
						type='text'
						name='aptOrSuiteNumber'
						value={values.aptOrSuiteNumber}
						onChange={handleChange}
					/>
				</label>
				<label>
					city:
					<input
						type='text'
						name='city'
            required
						value={values.city}
						onChange={handleChange}
					/>
				</label>
				<label>
					state:
					<input
						type='text'
						name='state'
            required
						value={values.state}
						onChange={handleChange}
					/>
				</label>
				<label>
					Zip code:
					<input
						type='text'
						name='zipCode'
            required
						value={values.zipCode}
						onChange={handleChange}
					/>
				</label>
				<label>
					Price per night (optional):
					<input
						type='number'
						name='pricePerNight'
						value={values.pricePerNight}
						onChange={handleChange}
					/>
				</label>
				<button className='place-form' type='submit'>
					Add a Place
				</button>        
			</form>
		</div>
	);
};

//{(e) => handleSubmit(e)}
