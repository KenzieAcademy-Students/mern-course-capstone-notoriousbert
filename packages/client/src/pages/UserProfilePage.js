import DeviceDeveloperMode from 'material-ui/svg-icons/device/developer-mode'
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
    

    const getUser = async ()=>{
        try{
            const userResponse = await axios.get(`/users/${uid}`)
            setUser(userResponse.data)
            setLoading(false);
        } catch (error) { 
            console.log("there has been an error")
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
        try{
            if(formData.newPassword.length >0 && (formData.newPassword !== formData.confirmPassword)){
                toast.error(
                    `'New Password' and 'Confirm New Password' input fields do not match`
                  )
                  return
            }
            await axios.put('users/614c993aa62627fb3947970f', {
            username: formData.newusername === ""? user.username: formData.newusername,
            oldPassword: formData.oldPassword === "" ? "" : formData.oldPassword,
            newPassword: formData.newPassword === "" ? "" : formData.newPassword, 
            email: formData.email ===""? user.email: formData.email})
            setFormData(initialState)
        } catch (error) {
           console.log("you cannot edit profile at this time")
        }
}

if (loading) {
    return <LoadingSpinner full />;
  }

return (
    <div>
    <Container fluid>
        <Row>
            <Col>
            <div style={{margin:10}}>{user.username}</div>
            {state.user && state.user.username === uid ? (<div style={{margin:10}}>{user.email}</div>) : null} 
            <h3>Favorites</h3>
            <div>{user.favorites.map((favorite)=>(
                <div>PlaceName: {favorite.placeName}</div>
            ))}</div>
            <h3>Reviews</h3>
            <div>{user.reviews.map((review)=>(
                <div>Placename: {review.location.placeName}
                    <div>Author: {review.author.username}</div>
                    <div>Review: {review.text}</div>
                </div>
            ))}</div>
            </Col> 
            {(state.user && state.user.username === uid) ? 
            (<Col>
            <h3>Edit Profile Information</h3>
            <Form id="editForm">
                <h5>Profile Information</h5>
                <span> Current Username: {user.username}</span>
                <div class="form-group">
                    <input name="newusername" placeholder="New Username" value={formData.newusername} onChange={(e)=>{handleChange(e)}}/>
                </div>
                <h5>Change Password</h5>
                <div class="form-group">
                    <input name="oldPassword" placeholder="Old Password" value={formData.oldPassword} onChange={(e)=>{handleChange(e)}}/>
                </div>
                <div class="form-group">
                    <input name="newPassword" placeholder="New Password" value={formData.newPassword} onChange={(e)=>{handleChange(e)}}/>
                </div>
                <div class="form-group">
                    <input name="confirmPassword" placeholder="Confirm New Password"value={formData.confirmPassword} onChange={(e)=>{handleChange(e)}}/>
                </div>
                <h5>Change Email</h5>
                <span>Current Email: {user.email}</span>
                <div class="form-group">
                    <input name="email" placeholder="New Email" value={formData.email} onChange={(e)=>{handleChange(e)}}/>
                </div>
                <Button variant="outline-primary" size="sm" style={{margin:10}} onClick={(e)=>{handleSubmit(e)}}>EDIT</Button>
            </Form>
            </Col>) : null}
        </Row>
    </Container>
    </div>
)}
