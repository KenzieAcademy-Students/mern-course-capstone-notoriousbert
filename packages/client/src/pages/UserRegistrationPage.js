import React, { useState } from "react";
import { Link } from "react-router-dom";
import useRouter from "hooks/useRouter";
import { useProvideAuth } from "hooks/useAuth";
import { setAuthToken } from "util/axiosConfig";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const auth = useProvideAuth();
  const router = useRouter();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { username, email, password, password2 } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    try {
      const res = await auth.signup(
        formData.username,
        formData.password,
        formData.email
      );
      setAuthToken(res.data.token);
      router.push(`/users/${res.data.username}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <section class="container">
      <h1 className="large">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group form-input-width">
          <input
            type="text"
            placeholder="Username"
            className="rounded border-info"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group form-input-width">
          <input
            type="email"
            placeholder="Email Address"
            className="rounded border-info"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group form-input-width">
          <input
            type="password"
            placeholder="Password"
            className="rounded border-info"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group form-input-width">
          <input
            type="password"
            placeholder="Confirm Password"
            className="rounded border-info"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login" className="sign">Sign In</Link>
      </p>
    </section>
  );
};

export default Register
