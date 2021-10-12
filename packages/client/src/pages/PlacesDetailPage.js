import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Tooltip,
  OverlayTrigger,
  Card,
  Figure,
} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
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
  history,
}) {
  const {
    state: { user },
  } = useProvideAuth();
  const [mapMarker, setMapMarker] = useState();
  const [loading, setLoading] = useState(true);
  const { state } = useProvideAuth();
  const [favorited, setFavorited] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState();

  const getMarkerAndSetFav = async () => {
    try {
      const singleMarker = await axios.get(`places/${pid}`);
      setMapMarker(singleMarker.data);
      console.log(singleMarker.data);
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
      setMapMarker(singleMarker.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      getMarkerAndSetFav();
    } else {
      getMarker();
    }
  }, [user]);

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

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const calculateAverageRating = (reviews) => {
    let numReviewsWithARating = 0;
    const sum = reviews.reduce((accumulator, review) => {
      if (review.rating && review.author) {
        accumulator = accumulator + review.rating;
        numReviewsWithARating++;
      }
      return accumulator;
    }, 0);

    const average = sum / numReviewsWithARating;
    return average.toFixed(2);
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
    try {
      const addReview = await axios.put("places/review", {
        text: reviewText,
        userId: uid,
        placeId: mapMarker._id,
        rating: rating,
      });
      setReviewText("");
      setRating(0);
      getMarker();
      toast.success("Review was created!");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const petCategories = {
    Dog: (
      <Figure>
        <Figure.Image
          id="pet-categories"
          alt="Dog"
          src="/icons8-dog-right.svg"
        />
        <Figure.Caption>Dog</Figure.Caption>
      </Figure>
    ),
    Cat: (
      <Figure>
        <Figure.Image
          id="pet-categories"
          alt="Cat"
          src="/icons8-cat-smile.svg"
        />
        <Figure.Caption>Cat</Figure.Caption>
      </Figure>
    ),
    Bird: (
      <Figure>
        <Figure.Image id="pet-categories" alt="Bird" src="/icons8-bird.svg" />
        <Figure.Caption>Bird</Figure.Caption>
      </Figure>
    ),
    Reptile: (
      <Figure id="figure-pet-categories">
        <Figure.Image
          id="pet-categories"
          alt="Reptile"
          src="/icons8-turtle.svg"
        />
        <Figure.Caption>Reptile</Figure.Caption>
      </Figure>
    ),
  };

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
                Pets Allowed: <br />
                <br />
                <div className="pet-cat-container">
                  {mapMarker.petsAllowed.map((pet, index) => (
                    <>
                      {petCategories[pet.category]}
                      {"   "}
                    </>
                  ))}{" "}
                </div>
              </h4>
              {mapMarker.reviews.length > 0 &&
                !isNaN(calculateAverageRating(mapMarker.reviews)) && (
                  <h4>
                    Average Rating: {calculateAverageRating(mapMarker.reviews)}
                  </h4>
                )}
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
            {user && (
              <div className="add-a-review">
                <span className="top-header">Leave A Review</span>
                <form onSubmit={(e) => handleReview(e)} className="place-form">
                  <label>
                    <span className="react-stars">
                      <ReactStars
                        value={rating}
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        isHalf={false}
                        activeColor="#ffd700"
                      />
                    </span>
                    <textarea
                      className="form-control form-rounded border border-info review-text-area"
                      type="text"
                      rows="5"
                      cols="50"
                      required
                      value={reviewText}
                      placeholder="Share your experience..."
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                  </label>
                  <Button type="submit" id="review-submit">
                    Submit
                  </Button>
                </form>
              </div>
            )}
            {mapMarker.reviews.map((review) => {
              return !review.author ? null : (
                <Card id="review-card">
                  <Card.Body>
                    <Card.Title className="m-0">
                      <Link to={`/users/${review.author.username}`}>
                        <h4>{review.author.username}</h4>
                      </Link>{" "}
                    </Card.Title>
                    <Card.Subtitle className="text-muted">
                      {timeSince(review.created)} ago
                    </Card.Subtitle>
                    <Card.Text>
                      {review.rating && (
                        <span className="react-stars finished-review">
                          <ReactStars
                            count={5}
                            edit={false}
                            value={review.rating}
                            size={24}
                            isHalf={true}
                            emptyIcon={
                              <img
                                src="/icons8-cat-unfilled.png"
                                alt="empty-star"
                              ></img>
                            }
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                          />
                        </span>
                      )}
                      <span id="review-text">{review.text}</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
