import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Tooltip,
  OverlayTrigger,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "components";
import axios from "util/axiosConfig.js";
import { timeSince } from "util/timeSince.js";
import { useProvideAuth } from "hooks/useAuth";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

export default function PlacesDetailPage({
  match: {
    params: { pid },
  },
}) {
  const {
    state: { user },
  } = useProvideAuth();
  const [mapMarker, setMapMarker] = useState();
  const [loading, setLoading] = useState(true);
  const { state } = useProvideAuth();
  const [favorited, setFavorited] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [ reviewText, setReviewText] = useState("")

  const getMarkerAndSetFav = async () => {
    try {
      const singleMarker = await axios.get(`places/${pid}`);
      setMapMarker(singleMarker.data);
      console.log(singleMarker.data)
      const userResponse = await axios.get(
        `/users/username/${state.user.username}`
      );

      let userFavs = [];
      for (let favorite of userResponse.data.favorites) {
        userFavs.push(favorite._id);
      }

      if (userFavs.includes(singleMarker.data._id)) {
        setFavorited(true);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const getMarker = async () => {
    try {
      const singleMarker = await axios.get(`places/${pid}`);
      console.log(singleMarker);
      setMapMarker(singleMarker.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    console.log(reviewText)
    if (user) {
      getMarkerAndSetFav();
    } else {
      getMarker();
    }
  }, [user, reviewText]);

  if (!mapMarker) {
    return (
      <Container className="h-100">
        <LoadingSpinner full />
      </Container>
    );
  }

  if (loading) {
    return <LoadingSpinner full />;
  }

  const handleFavorite = async () => {
    try {
      await axios.put(`users/favorites/${state.user.uid}`, {
        favPlace: mapMarker._id,
      });
      setFavorited(!favorited);
    } catch (error) {
      toast.error(error);
    }
  };

  const renderFavoritesTooltip = (props) => {
    if (user) {
      return (
        <Tooltip id="tooltip-top" {...props}>
          {favorited ? "Added to favorites!" : "Add to favorites?"}
        </Tooltip>
      );
    } else {
      <Tooltip id="tooltip-top" {...props}>
        Log in or sign up to add favorites
      </Tooltip>;
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {
      user: { uid },
    } = state;

    const addReview = await axios.put("places/review",{
      text : reviewText,
      userId : uid,
      placeId : mapMarker._id 
    })


    console.log(uid)
    console.log("handling review")
    console.log(state)
  }

  return (
    <section className="container">
      <div className="places-grid my-1 rounded">
        <div className=" rounded places-top background-primary pt-2 d-flex justify-content-md-between overflow-hidden">
          <h1 className="large-places">
            <p className="text-overflow-ellipsis">{mapMarker.placeName}</p>
            {isMobile ? (
              <span className="shift-up">
                {user && (
                  <Button variant="link" size="sm" onClick={handleFavorite}>
                    {favorited ? (
                      <RiHeart3Fill className="heart active" />
                    ) : (
                      <RiHeart3Line className="heart" />
                    )}
                  </Button>
                )}
              </span>
            ) : (
              <span className="shift-up">
                {user ? (
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 50, hide: 40 }}
                    overlay={renderFavoritesTooltip}
                  >
                    <Button variant="link" size="sm" onClick={handleFavorite}>
                      {favorited ? (
                        <RiHeart3Fill className="heart active" />
                      ) : (
                        <RiHeart3Line className="heart" />
                      )}
                    </Button>
                  </OverlayTrigger>
                ) : null}
              </span>
            )}
          </h1>
        </div>

        <div className="rounded places-about background-white">
          <h2 className="primary-text">Details</h2>
          <div className="line"></div>
          <div className="place-details-wrapper">
            <div className="place-details-content place-responsive">
              <h4>
                Category: {mapMarker.typeofPlace || mapMarker.typeOfPlace}
              </h4>
              <h4 className="d-flex flex-wrap capitalize">
                {isMobile ? (
                  <span className="text-capitalize">
                    Address: {mapMarker.address.toLowerCase()} <br />
                    {mapMarker.city.toLowerCase()},{" "}
                    {mapMarker.state.length <= 2
                      ? mapMarker.state
                      : mapMarker.state.toLowerCase()}{" "}
                    {mapMarker.zipcode}
                  </span>
                ) : (
                  <span className="text-capitalize">
                    Address: {mapMarker.address.toLowerCase()}{" "}
                    {mapMarker.city.toLowerCase()},{" "}
                    {mapMarker.state.length <= 2
                      ? mapMarker.state
                      : mapMarker.state.toLowerCase()}{" "}
                    {mapMarker.zipcode}
                  </span>
                )}
              </h4>

              <h4>
                Pets Allowed:{" "}
                {mapMarker.petsAllowed.map((pet, index) =>
                  index === mapMarker.petsAllowed.length - 1 ? (
                    <>{pet.category}</>
                  ) : (
                    <>{pet.category}, </>
                  )
                )}{" "}
              </h4>
              {mapMarker.description && (
                <h4>Description: {mapMarker.description}</h4>
              )}
            </div>
          </div>
        </div>

        <div className="rounded places-reviews background-white">
          <h2 className="primary-text">Reviews</h2>
          <div
            className="line"
            style={{ height: "0", margin: "0", padding: "0" }}
          ></div>

          <div className="d-flex justify-content-md-between align-items-space-between">
            {" "}
          <input
                    type="submit"
                    className="btn btn-primary"
                    value="Add a Review"
                    onClick={(e) => {
                      handleReview(e)
                    }}
                  />
            <textarea onChange={(e) => setReviewText(e.target.value)
            }/>
            {mapMarker.reviews.map((review) => (
              <Card>
                <Card.Body>
                  <Card.Title>
                    <Link to={`/users/${review.author.username}`}>
                      <h4>{review.author.username}</h4>
                    </Link>{" "}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {timeSince(review.created)} ago
                  </Card.Subtitle>
                  <Card.Text>
                    <div>
                      <p>{review.text}</p>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
