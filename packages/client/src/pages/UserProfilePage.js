import React, {useEffect, useState} from 'react'
import { LoadingSpinner } from "components";
import { Container } from 'react-bootstrap'
import { Col, Row, Button, Form} from 'react-bootstrap'
import { useProvideAuth } from "hooks/useAuth";
import axios from 'util/axiosConfig.js'
import { toast } from "react-toastify";


const initialState ={
    newusername:"",
    oldPassword:"",
    newPassword:"",
    confirmPassword:"",
    email:"",
}


export default function UserProfilePage({
    match: {
    params: {uid},
  },
}) {
    const { state } = useProvideAuth();
    const [formData, setFormData] = useState(initialState)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true);
    

    const getUser = async (userId)=>{
        if (userId) {
            try{
                const userResponse = await axios.get(`/users/${userId}`)
                console.log(userResponse)
                setUser(userResponse.data)
                setLoading(false);
            } catch (error) { 
                console.log("there has been an error")
            }
        } else {
            try{
                const userResponse = await axios.get(`/users/username/${uid}`)
                console.log(userResponse)
                setUser(userResponse.data)
                setLoading(false);
            } catch (error) { 
                console.log("there has been an error")
            }
        }

        
        
    }

    useEffect(()=>{
      getUser()
    },[uid])

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        e.stopPropagation()
        const {
            user: { uid},
          } = state;
        try{
            if(formData.newPassword.length >0 && (formData.newPassword !== formData.confirmPassword)){
                toast.error(
                    `'New Password' and 'Confirm New Password' do not match`
                  )
                  return
            }
            await axios.put(`users/${uid}`, {
            username: formData.newusername === ""? user.username: formData.newusername,
            oldPassword: formData.oldPassword === "" ? "" : formData.oldPassword,
            newPassword: formData.newPassword === "" ? "" : formData.newPassword, 
            email: formData.email ===""? user.email: formData.email})
            setFormData(initialState)
            
            console.log('newstate:', state)
            getUser(uid)
        } catch (error) {
          console.log("you cannot edit profile at this time")
        }
}

if (loading) {
    return <LoadingSpinner full />;
  }

return (
    <section class="container">
      <div class="profile-grid my-1">

        <div class="profile-top background-primary p-2">
          <h1 class="large-profile">{user.username}</h1>
        </div>
      
        <div class="profile-about background-white">
          <h2 class="primary-text">Edit Profile Information</h2>
          <div class="line"></div>

          <Form id="editForm">
            <h4> Current Username: {user.username}</h4>
            <div class="form-group">
                <input name="newusername" placeholder="New Username" value={formData.newusername} onChange={(e)=>{handleChange(e)}}/>
            </div>
            <h4>Change Password</h4>
            <div class="form-group">
                <input name="oldPassword" placeholder="Old Password" value={formData.oldPassword} onChange={(e)=>{handleChange(e)}}/>
            </div>
            <div class="form-group">
                <input name="newPassword" placeholder="New Password" value={formData.newPassword} onChange={(e)=>{handleChange(e)}}/>
            </div>
            <div class="form-group">
                <input name="confirmPassword" placeholder="Confirm New Password"value={formData.confirmPassword} onChange={(e)=>{handleChange(e)}}/>
            </div>
            <h4>Change Email</h4>
            <span>Current Email: {user.email}</span>
            <div class="form-group">
                <input name="email" placeholder="New Email" value={formData.email} onChange={(e)=>{handleChange(e)}}/>
            </div>
            <input type="submit" className="btn btn-primary" value="Confirm Changes" onClick={(e)=>{handleSubmit(e)}} />
          </Form>
        </div>

        <div class="profile-favorites background-white">
          <h2 class="primary-text">Favorites</h2>
          <div class="line"></div>
          <div class="p-1">
            {user.favorites.map((favorite)=>(
              <div>PlaceName: {favorite.placeName}</div>
            ))}
          </div>
        </div>

        <div class="profile-reviews background-white">
        <h2 class="primary-text">Reviews</h2>
        <div class="line"></div>
            <div>{user.reviews.map((review)=>(
              <div>Placename: {review.location.placeName}
              <div>Author: {review.author.username}</div>
              <div>Review: {review.text}</div>
            </div>
            ))}
            </div>
            {(state.user && state.user.username === uid) ? (<Col></Col>) : null}
        </div>
      </div>
  </section>
)}
