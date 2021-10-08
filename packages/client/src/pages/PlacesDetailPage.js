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

  const getMarkerAndSetFav = async () => {
    setLoading(true);

    try {
      const singleMarker = await axios.get(`places/${pid}`);
      setMapMarker(singleMarker.data);
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
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getMarkerAndSetFav();
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

  const renderFavoritesTooltip = (props) => {
    // const newProps = {
    //   ...props,
    //   ["data-popper-reference-hidden"]: false,
    //   style: {
    //     ...props.style,
    //     transform: "translate3d(65vw, 114px, 0)",
    //   },
    // };
    console.log(props);
    return (
      <Tooltip id="tooltip-top" {...props}>
        {favorited ? "Added to favorites!" : "Add to favorites?"}
      </Tooltip>
    );
  };

  return (
    <section className="container">
      <div className="places-grid my-1 rounded">
        <div className=" rounded places-top background-primary p-2">
          <h1 className="large-places">
            {mapMarker.placeName}
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 40 }}
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
          </h1>
        </div>

        <div className="rounded places-about background-white">
          <h2 className="primary-text">Details</h2>
          <div className="line"></div>
          <div>
            <h4>Category: {mapMarker.typeofPlace || mapMarker.typeOfPlace}</h4>
            <h4>
              Address: {mapMarker.address} <br /> {mapMarker.city},
              {mapMarker.state} <br />
              {mapMarker.zipcode}
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
          <div></div>
        </div>
      </div>
    </section>
  );
}
