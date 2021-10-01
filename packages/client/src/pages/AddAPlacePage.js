import React, { useEffect, useState } from "react";
import axios from "util/axiosConfig.js";
import { toast } from "react-toastify";
import Geocode from "react-geocode";
import { useProvideAuth } from "hooks/useAuth";

export default function AddAPlacePage() {
    const {
        state: { user },
      } = useProvideAuth();

  const petsAllowedInitialState = {
    Reptile: {
      id: "",
      check: false,
    },
    Cat: {
      id: "",
      check: false,
    },
    Dog: {
      id: "",
      check: false,
    },
    Bird: {
      id: "",
      check: false,
    },
  };
  const [petsAllowedCheck, setPetsAllowedCheck] = useState(
    petsAllowedInitialState
  );


  const geocodeFunc = async (address) => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    try {
      const response = await Geocode.fromAddress(address);
      const { lat, lng } = response.results[0].geometry.location;
    return [lat, lng]
    } catch (error) {
      console.log(error);
      toast.error("Unable to retrieve location data, please re-enter data.");
    }
  };

  const handleCheckBox = (e) => {
    setPetsAllowedCheck((prevState) => ({
      ...prevState,
      [e.target.name]: {
        ...prevState[e.target.name],
        check: e.target.checked,
      },
    }));
  };
  const [values, setValues] = useState({
    placeName: "",
    typeOfPlace: "Restaurant",
    address: "",
    petsAllowed: "",
    description: "",
    aptOrSuiteNumber: "",
    city: "",
    state: "",
    zipcode: "",
    pricePerNight: "",
  });

  const getPets = async () => {
    try {
      const pets = await axios.get("pets");
      for (const pet of pets.data) {
        setPetsAllowedCheck((prevState) => ({
          ...prevState,
          [pet.category]: {
            ...prevState[pet.category],
            id: pet._id,
          },
        }));
      }
    } catch (err) {
      toast.error(`Unable to retrieve pet data.`);
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      typeOfPlace,
      placeName,
      address,
      aptOrSuiteNumber,
      description,
      city,
      state,
      zipcode,
      pricePerNight,
    } = values;

    const addressForGeocode = `${address} ${city} ${state} ${zipcode}`;

    try {
      const [lat, lng ] = await geocodeFunc(addressForGeocode);

      let petsAllowed = [];
      for (const [pet, value] of Object.entries(petsAllowedCheck)) {
        if (value.check === true) {
          petsAllowed.push(value.id);
        }
      }

      try {
        const aPlace = await axios.post("places", {
          typeOfPlace,
          placeName,
          address,
          aptOrSuiteNumber,
          city,
          description,
          state,
          zipcode,
          pricePerNight,
          petsAllowed,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        });
        toast.success("Place was created!");
        setValues({
          ...values,
          placeName: "",
          typeOfPlace: "Restaurant",
          address: "",
          petsAllowed: "",
          description: "",
          aptOrSuiteNumber: "",
          city: "",
          state: "",
          zipcode: "",
          pricePerNight: "",
        });
        setPetsAllowedCheck({
          ...petsAllowedCheck,
          Reptile: {
            id: "",
            check: false,
          },
          Cat: {
            id: "",
            check: false,
          },
          Dog: {
            id: "",
            check: false,
          },
          Bird: {
            id: "",
            check: false,
          },
        });
        getPets()
      } catch (error) {
        toast.error(error.response.data.error);
      }
    } catch (error) {
      toast.error("Unable to retrieve location data, please re-enter data.");
    }
  };
  return (
      
    <div className="form-container">
      <h1>Add a place</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="place-form">
        <label>
          Place Name:
          <input
            type="text"
            name="placeName"
            required
            value={values.placeName}
            onChange={handleChange}
          />
        </label>
        <label>
          Place Type:
          <select
            name="typeOfPlace"
            required
            id="places"
            value={values.typeOfPlace}
            onChange={handleChange}
          >
            <option value="restaurant">Restaurant</option>
            <option value="hotel">Hotel</option>
            <option value="parks">Park</option>
            <option value="bar">Bar</option>
          </select>
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            required
            value={values.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Cats:
          <input
            type="checkbox"
            name="Cat"
            checked={petsAllowedCheck.Cat.check}
            onChange={handleCheckBox}
          />
        </label>
        <label>
          Dogs:
          <input
            type="checkbox"
            name="Dog"
            checked={petsAllowedCheck.Dog.check}
            onChange={handleCheckBox}
          />
        </label>
        <label>
          Reptiles:
          <input
            type="checkbox"
            name="Reptile"
            checked={petsAllowedCheck.Reptile.check}
            onChange={handleCheckBox}
          />
        </label>
        <label>
          Birds:
          <input
            type="checkbox"
            name="Bird"
            checked={petsAllowedCheck.Bird.check}
            onChange={handleCheckBox}
          />
        </label>
        <label>
          Description (optional):
          <input
            type="text"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
        </label>
        <label>
          apt or suite number:
          <input
            type="text"
            name="aptOrSuiteNumber"
            value={values.aptOrSuiteNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          city:
          <input
            type="text"
            name="city"
            required
            value={values.city}
            onChange={handleChange}
          />
        </label>
        <label>
          state:
          <input
            type="text"
            name="state"
            required
            value={values.state}
            onChange={handleChange}
          />
        </label>
        <label>
          Zip code:
          <input
            type="text"
            name="zipcode"
            required
            value={values.zipcode}
            onChange={handleChange}
          />
        </label>
        <label>
          Price per night (optional):
          <input
            type="number"
            name="pricePerNight"
            value={values.pricePerNight}
            onChange={handleChange}
          />
        </label>
        <button className="place-form" type="submit">
          Add a Place
        </button>
      </form>
    </div>
  );
}
