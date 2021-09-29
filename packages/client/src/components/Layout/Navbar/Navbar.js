import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.scss'

const Navbar = () => {
  return (
    <div className="navbar-container">
<<<<<<< HEAD
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
=======
    <nav className="navbar bg-dark">
      <div>
        <Link to='/users/:uid'><img src='icons8-animal-shelter.svg' alt='logo'/></Link>
      </div>
      <ul>
        <li><Link to="/map">Map</Link></li>
        <li><Link to='/signup'>Register</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/add-a-place'>Add a Place</Link></li>
      </ul>
    </nav>
>>>>>>> 8e4cd6d11a4f3c1c01a52a4bd9cb677e10fe02b3
    </div>
  )
}

export default Navbar