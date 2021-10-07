import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useProvideAuth } from "hooks/useAuth";
import { setAuthToken } from "util/axiosConfig";
import useRouter from "hooks/useRouter";
import { toast } from "react-toastify";

const Login = ({
  match: {
    params: { uid },
  },
}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const auth = useProvideAuth();
  const router = useRouter();

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await auth.signin(formData.username, formData.password);
      setAuthToken(res.data.token);
      router.push(`/users/${res.data.username}`);
    } catch (error) {
      console.log("could not sign in");
    }
  };

  return (
    <section className="container">
      <h1 className="large">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group form-input-width">
          <input
            type="username"
            placeholder="Username"
            name="username"
            className="rounded border-info"
            value={username}
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
        <input type="submit" className="btn btn-primary" value="Sign In" />
      </form>
      <p className="my-1">
        Don't have an account?{" "}
        <Link to="/signup" className="sign">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default Login;
