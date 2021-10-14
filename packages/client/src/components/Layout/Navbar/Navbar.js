import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./navbar.scss";
import { useProvideAuth } from "hooks/useAuth";

const NavbarTop = () => {
  const {
    state: { user },
    signout,
  } = useProvideAuth();

  return (
    <div>
      <nav className="navbar">
        <Link to={user ? `/users/${user.username}` : `/map`}>
          <img src="/icons8-animal-shelter.svg" alt="logo" className="logo" />
        </Link>
        <ul className={user ? "logged-in" : "not-logged-in"}>
          <li>
            <Link id={user ? "logged-in-a-1" : ""} to="/map">
              Map
            </Link>
          </li>
          <li>
            <Link id={user ? "logged-in-a-2" : ""} to="/add-a-place">
              Add a Place
            </Link>
          </li>
          {user ? null : (
            <li>
              <Link to="/signup">Register</Link>
            </li>
          )}
          {user ? null : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
        {user ? <Button onClick={() => signout()}>Sign Out</Button> : null}
      </nav>
    </div>
  );
};

export default NavbarTop;
