import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Figure } from "react-bootstrap";
import "./navbar.scss";
import { useProvideAuth } from "hooks/useAuth";

const NavbarTop = () => {
  const {
    state: { user },
    signout,
  } = useProvideAuth();

  return (
    <div className="navbar-container">
      <nav className="navbar bg-dark">
        <div>
          <Link to= {user ? (`/users/${user.username}`) : (`/map`)}>
            <img src="icons8-animal-shelter.svg" alt="logo" />
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/map">Map</Link>
          </li>
          <li>
            <Link to="/add-a-place">Add a Place</Link>
          </li>
          {user ? null : (
          <li>
            <Link to="/signup">Register</Link>
          </li>)}
          {user ? null : (<li>
            <Link to="/login">Login</Link>
          </li>)}
        </ul>
        {user ? (
        <Button
          variant="outline-info"
          onClick={() => signout()}
          style={{ border: "none", marginRight: "50px", color: "#E5E1DF" }}
        >
          Sign Out
        </Button>) : null}
      </nav>
    </div>
  );
};

export default NavbarTop;
