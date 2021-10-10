import React, { useEffect, useState } from "react";
import axios from "util/axiosConfig.js";
import { toast } from "react-toastify";
import Geocode from "react-geocode";
import {
  Container,
  Form,
  Button,
  Media,
  Figure,
  ListGroup,
  Modal,
  Tooltip,
  OverlayTrigger,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useProvideAuth } from "hooks/useAuth";

export default function AddAPlacePage() {
  const { state, getCurrentUser } = useProvideAuth();
  const [user, setUser] = useState();

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
      return [lat, lng];
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
    const thisUser = getCurrentUser();
    console.log(thisUser);
    setUser(thisUser);
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
      const [lat, lng] = await geocodeFunc(addressForGeocode);

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
        getPets();
      } catch (error) {
        toast.error(error.response.data.error);
      }
    } catch (error) {
      toast.error("Unable to retrieve location data, please re-enter data.");
    }
  };
  return (
    <section className="container">
      {getCurrentUser() ? (
        <Container className="d-flex flex-row">
          <div className="form-container">
            <h1 className="large">Add a place</h1>
            <p className="lead">
              <i class="fas fa-map-marked-alt"></i> Don't see a place on the map
              that you know is pet-friendly? Add it here!
            </p>
            <Row className="justify-content-center">
              <form onSubmit={(e) => handleSubmit(e)} className="place-form">
                <Col className="d-flex-baseline">
                  <div className="form-group mt-3">
                    <div className="pr">
                      <label>
                        Place Name:
                        <input
                          className="rounded border-info"
                          type="text"
                          name="placeName"
                          required
                          value={values.placeName}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-group custom-select pr form-input-width">
                    <label>
                      Place Type:
                      <select
                        className="border border-info rounded"
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
                  </div>
                  <div className="form-group pr">
                    <label>
                      Address:
                      <input
                        class="form-control form-rounded border border-info"
                        type="text"
                        name="address"
                        required
                        value={values.address}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="">
                    <div className="p-2">Pets Allowed:</div>
                    <div className="pb-0 d-flex form-input-width wrap-checkboxes">
                      <div className="form-check m-1">
                        <label>
                          Cats
                          <input
                            class="form-check-input border-info"
                            type="checkbox"
                            name="Cat"
                            checked={petsAllowedCheck.Cat.check}
                            onChange={handleCheckBox}
                          />
                        </label>
                      </div>
                      <div className="form-check m-1">
                        <label>
                          Dogs
                          <input
                            class="form-check-input border border-info"
                            type="checkbox"
                            name="Dog"
                            checked={petsAllowedCheck.Dog.check}
                            onChange={handleCheckBox}
                          />
                        </label>
                      </div>
                      <div className="form-check m-1">
                        <label>
                          Reptiles
                          <input
                            class="form-check-input border border-info"
                            type="checkbox"
                            name="Reptile"
                            checked={petsAllowedCheck.Reptile.check}
                            onChange={handleCheckBox}
                          />
                        </label>
                      </div>
                      <div className="form-check m-1">
                        <label>
                          Birds
                          <input
                            class="form-check-input border border-info"
                            type="checkbox"
                            name="Bird"
                            checked={petsAllowedCheck.Bird.check}
                            onChange={handleCheckBox}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="d-flex">
                  <div className="form-group">
                    <label>
                      Description (optional):
                      <textarea
                        class="form-control form-rounded border border-info"
                        type="text"
                        rows="5"
                        cols="33"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </Col>
                <div className="form-group m-0">
                  <label>
                    Apt or suite number:
                    <input
                      class="form-control form-rounded border border-info"
                      type="text"
                      name="aptOrSuiteNumber"
                      value={values.aptOrSuiteNumber}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    City:
                    <input
                      class="form-control form-rounded border border-info"
                      type="text"
                      name="city"
                      required
                      value={values.city}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    State:
                    <input
                      class="form-control form-rounded border border-info"
                      type="text"
                      name="state"
                      required
                      value={values.state}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Zip code:
                    <input
                      class="form-control form-rounded border border-info"
                      type="text"
                      name="zipcode"
                      required
                      value={values.zipcode}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Price per night (optional):
                    <input
                      class="form-control form-rounded border border-info"
                      type="number"
                      name="pricePerNight"
                      value={values.pricePerNight}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <button className="btn btn-primary" type="submit">
                  Add a Place
                </button>
              </form>
            </Row>
          </div>
        </Container>
      ) : (
        <Container className="d-flex flex-row">
          <div className="form-container">
            <h1 className="large you-must-be-logged-in">
              You must be logged in to add a place.
            </h1>
            <p className="my-1 responsive">
              Already have an account?{" "}
              <Link to="/login" className="sign">
                Sign In
              </Link>
            </p>
            <p className="my-1 responsive">
              Don't have an account?{" "}
              <Link to="/signup" className="sign">
                Sign Up
              </Link>
            </p>
          </div>
        </Container>
      )}
    </section>
  );
}

//<Row className="pt-5 justify-content-center">
