import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.scss'

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar bg-dark">
        <div>
          <Link to='/'><img src='icons8-animal-shelter.svg' alt='logo' /></Link>
        </div>
        <ul>
          <li><Link to="/map">Map</Link></li>
          <li><Link to='/signup'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
          {/* <li><Link to='/places/:placeId'>Place Detail</Link></li> */}
          <li><Link to='/add-a-place'>Add a Place</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar