import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "components";
import { Button, Form, Collapse, Card } from "react-bootstrap";
import { useProvideAuth } from "hooks/useAuth";
import axios from "util/axiosConfig.js";
import { toast } from "react-toastify";
import { timeSince } from "util/timeSince";
import ReactStars from "react-rating-stars-component";

const initialState = {
  newusername: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
  email: "",
};

export default function UserProfilePage({
  match: {
    params: { uid },
  },
}) {
  const { state, updateUsername } = useProvideAuth();
  const [formData, setFormData] = useState(initialState);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const getUser = async (userId) => {
    setLoading(true);
    if (userId) {
      try {
        const userResponse = await axios.get(`/users/${userId}`);
        console.log(userResponse);
        setUser(userResponse.data);
        setLoading(false);
      } catch (error) {
        console.log("there has been an error");
      }
    } else {
      try {
        const userResponse = await axios.get(`/users/username/${uid}`);
        console.log(userResponse);
        setUser(userResponse.data);
        setLoading(false);
      } catch (error) {
        console.log("there has been an error");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [uid]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {
      user: { uid },
    } = state;
    try {
      if (
        formData.newPassword.length > 0 &&
        formData.newPassword !== formData.confirmPassword
      ) {
        toast.error(`'New Password' and 'Confirm New Password' do not match`);
        return;
      }
      const userData = await axios.put(`users/${uid}`, {
        username:
          formData.newusername === "" ? user.username : formData.newusername,
        oldPassword: formData.oldPassword === "" ? "" : formData.oldPassword,
        newPassword: formData.newPassword === "" ? "" : formData.newPassword,
        email: formData.email === "" ? user.email : formData.email,
      });
      setFormData(initialState);
      updateUsername(userData);
      getUser(uid);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  if (loading) {
    return <LoadingSpinner full />;
  }

  return (
    <section class="container user-profile">
      <div class="profile-grid my-1">
        <div class="rounded profile-top background-primary p-2">
          <h1 class="large-profile">{uid}</h1>
        </div>
        {/* CONDITIONAL RENDER */}
        {state.user && user.username === state.user.username && (
          <div class="rounded profile-about background-white">
            <div class="line"></div>
            <div onClick={() => setOpen(!open)} aria-expanded={open}>
              <Button class="primary-text">Edit Profile Information</Button>
            </div>
            <Collapse in={open}>
              <Form id="editForm" className="mt-3">
                <div id="edit-form">
                  <h4> Current Username: {user.username}</h4>
                  <div id="example-collapse-text">
                    <div class="form-group">
                      <input
                        name="newusername"
                        placeholder="New Username"
                        value={formData.newusername}
                        className="rounded border-info"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                    <h4>Change Password</h4>
                    <div class="form-group">
                      <input
                        name="oldPassword"
                        placeholder="Old Password"
                        className="rounded border-info"
                        value={formData.oldPassword}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <input
                        name="newPassword"
                        placeholder="New Password"
                        className="rounded border-info"
                        value={formData.newPassword}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <input
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        className="rounded border-info"
                        value={formData.confirmPassword}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                    <h4>Change Email</h4>
                    <span>Current Email: {user.email}</span>
                    <div class="form-group">
                      <input
                        name="email"
                        placeholder="New Email"
                        className="rounded border-info"
                        value={formData.email}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <span id="edit-profile-button">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Confirm Changes"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  />
                </span>
              </Form>
            </Collapse>
          </div>
        )}
        <div
          id="favorites-section"
          class="profile-favorites background-white rounded"
        >
          <h2 class="primary-text responsive-header-user-profile">Favorites</h2>
          <div class="line"></div>
          <div class="p-1">
            {user.favorites.map((favorite, index) => {
              // return <Link to={`/users/${review.author.username}`}>{review.author.username}</Link>
              return (
                <div className="favorites-text-outer-container">
                  <div className="favorites-text-inner-container">
                    <a
                      className="sign responsive-favorites-text"
                      href={`/places/${favorite._id}`}
                    >
                      <p> {favorite.placeName}</p>
                    </a>
                  </div>
                  {user.favorites &&
                  index === user.favorites.length - 1 ? null : (
                    <hr />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div
          id="reviews-section"
          class="profile-reviews background-white rounded"
        >
          <h2 class="primary-text responsive-header-user-profile">Reviews</h2>
          <div class="line" style={{ padding: "0", margin: "0" }}></div>
          <div id="reviews-top-container">
            {user.reviews.map((review) => (
              <div className="review-card">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <a
                        className="sign responsive-card-title"
                        href={`/places/${review.location._id}`}
                      >
                        {review.location.placeName}
                      </a>{" "}
                    </Card.Title>
                    <Card.Subtitle
                      className="mb-2 text-muted"
                      id="responsive-card-subtitle"
                    >
                      {timeSince(review.created)} ago
                    </Card.Subtitle>
                    <Card.Text id="card-text">
                      {review.rating && (
                        <span className="react-stars">
                          <ReactStars
                            count={5}
                            edit={false}
                            value={review.rating}
                            size={16}
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
                      {review.text}
                    </Card.Text>
                  </Card.Body>
                </Card>
                {/* <hr /> */}
              </div>
            ))}
            {/* </div> */}
          </div>
          {/* {(state.user && state.user.username === uid) ? (<Col></Col>) : null} */}
        </div>
      </div>
    </section>
  );
}
