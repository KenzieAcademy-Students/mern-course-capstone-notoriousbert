import React, { useState } from "react";
import axios from "../util/axiosConfig.js";

export default function AddAPlacePage() {
	const [petsAllowed, setPetsAllowed] = useState({
		cats: false,
		dogs: false,
		reptiles: false,
		birds: false,
	});

  const handleCheckBox = (e) => {
		setPetsAllowed({
			...petsAllowed,
			[e.target.name]: !e.target.checked,
		});
  }
	const [values, setValues] = useState({
		placeName: "",
		typeOfPlace: "",
		address: "",
		petsAllowed: "",
		description: "",
		aptOrSuiteNumber: "",
		city: "",
		state: "",
		zipCode: "",
		pricePerNight: "",
	});

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
    axios.post();
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
						value={values.placeName}
						onChange={handleChange}
					/>
				</label>
				<label>
					Place Type:
					<select
						name='places'
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
						value={values.address}
						onChange={handleChange}
					/>
				</label>
				<label>
					Cats:
					<input
						type='checkbox'
						name='cats'
						checked={petsAllowed.cats}
						onChange={handleCheckBox}
					/>
				</label>
				<label>
					Dogs:
					<input
						type='checkbox'
						name='petsAllowed'
						checked={petsAllowed.dogs}
						onChange={handleChange}
					/>
				</label>
				<label>
					Reptiles:
					<input
						type='checkbox'
						name='reptiles'
						checked={petsAllowed.reptiles}
						onChange={handleChange}
					/>
				</label>
				<label>
					Birds:
					<input
						type='checkbox'
						name='petsAllowed'
						checked={petsAllowed.birds}
						onChange={handleChange}
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
						value={values.city}
						onChange={handleChange}
					/>
				</label>
				<label>
					state:
					<input
						type='text'
						name='state'
						value={values.state}
						onChange={handleChange}
					/>
				</label>
				<label>
					Zip code:
					<input
						type='text'
						name='zipCode'
						value={values.zipCode}
						onChange={handleChange}
					/>
				</label>
				<label>
					Price per night:
					<input
						type='text'
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
}
