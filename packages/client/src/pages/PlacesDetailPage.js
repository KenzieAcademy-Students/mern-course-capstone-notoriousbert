import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "components";
import axios from "util/axiosConfig.js";
import { timeSince } from 'util/timeSince.js'
import PlaceBox from "components/PlaceBox";
import { useProvideAuth } from "hooks/useAuth";

export default function PlacesDetailPage({
  match: {
    params: { pid },
  },
}) {
  const {
    state: { user },
  } = useProvideAuth();
  const [mapMarker, setMapMarker] = useState();
  const [loading, setLoading] = useState(false);

  const getMarker = async () => {
    setLoading(true);

    try {
      const singleMarker = await axios.get(`places/${pid}`);
      setMapMarker(singleMarker.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log(pid);
    console.log(user)
    getMarker();

    console.log(mapMarker);
  }, []);

  if (!mapMarker) {
    return (
      <Container className="h-100">
        <LoadingSpinner full />
      </Container>
    );
  }

  return (
    <section className="container">
      <div className="places-grid my-1">
      <div className="places-top background-primary p-2">
        <h1 className="large-places">{mapMarker.placeName}</h1>
        </div>

        <div className="places-about background-white">
          <h2 className="primary-text">Details</h2>
          <div className="line"></div>
          <h4>Category: {mapMarker.typeofPlace || mapMarker.typeOfPlace}</h4>
          <h4>Address: {mapMarker.address} <br /> {mapMarker.city},{mapMarker.state} <br />{mapMarker.zipcode}</h4>

          <h4>Pets Allowed: {mapMarker.petsAllowed.map((pet, index) => (index === mapMarker.petsAllowed.length - 1 ? <>{pet.category}</> : <>{pet.category}, </>))} </h4>
        </div>

        <div className="places-reviews background-white">
          <h2 className="primary-text">Reviews</h2>
          <div className="line"></div>

          <div> {mapMarker.reviews.map((review) => <div>
            <h4 className="review"></h4>

            <p>"{review.text}"</p>

            <Link to={`/users/${review.author.username}`}>{review.author.username}</Link> 
        
            <p className="time">{timeSince(review.created)} ago</p>

          </div>)} 
          </div>
        </div>
      </div>
  </section>
  );
}