import React, { Fragment, useState } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import useRouter from "hooks/useRouter";
import { useProvideAuth } from "hooks/useAuth";
import { setAuthToken } from "util/axiosConfig";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  })

  const auth = useProvideAuth();
  const router = useRouter();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const { username, email, password, password2 } = formData

  const onSubmit = async (e) => {
    e.preventDefault()
    
    if (password !== password2) {
      console.log('Passwords do not match')
    } 

    console.log(formData)

    try {
      const res = await auth.signup(formData.username, formData.password, formData.email)
      setAuthToken(res.token)
      // router.push('/user/:id')

    } catch(err) {
      console.log("not submitted")
    }
  }


  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
              type="text" 
              placeholder="Username" 
              name="username" 
              value={username}
              onChange={e => onChange(e)}
              required
            />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
  </Fragment>
  )
}

export default Register