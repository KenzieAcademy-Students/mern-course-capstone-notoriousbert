import React, {useEffect, useState} from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row, Button} from 'react-bootstrap'
import axios from 'util/axiosConfig.js'




export default function UserProfilePage(props) {

    // // const { state } = useProvideAuth()
    const [user, setUser] = useState()
    // // const [loading, setLoading] = useState(true)
    // // const [validated, setValidated] = useState(false)
    // // const [open, setOpen] = useState(false)
    // const [data, setData] = useState({
    // //   password: '',
    // //   currentPassword: "",
    // //   confirmPassword: "",
    // //   isSubmitting: false,
    // //   errorMessage: null,
    // //   profileAvatar: ""
    //     userName:"",
    //     email:"",
    //     passwordHash:"",
    //     profileImage:"",
    //     reviews:"",
    //     reviewLikes:"",
    //     favorites:"",
    //     pets:""
    // })

    //returned from endpoint
    // "_id": "614391d284fe56afaef4daa0",
    // "username": "alicia",
    // "email": "alicia@gmail.com",
    // "passwordHash": "$2a$12$Ay6Fe/hPn/UaUqH2dj/wVuSFDgnmiZzXTfWiGm1F8bKz4fK5I8iZ6",
    // "profile_image": "whale.svg",
    // "reviews": [],
    // "reviewLikes": [],
    // "favorites": [],
    // "pets": [],
    // "__v": 0

    const getUser = async ()=>{
        try{
            const userResponse = await axios.get('/users/bert')
            // console.log(userResponse)
            setUser(userResponse.data)
        } catch (error) { 
            console.log("there has been an error")
        }
        
    }

    useEffect(()=>{
        getUser()
    },[])

    console.log(user)
    // console.log(user.username)
    // console.log(user.favorites)
    

if (!user){
    return <div>LOADING</div>
}
return (
    <div>
    <Container fluid>
        <Row>
            <Col>
            <h3>favorites</h3>
            <div>list of favorites</div>
            <h3>Reviews</h3>
            <div>list of reviews</div>
            </Col> 
            <Col>
            <div>{user.username}</div>
            <div>{user.email}</div> 
            <h3>Edit Profile Information</h3>
            <Button variant="outline-primary" size="sm">EDIT</Button>
            </Col>
        </Row>
    </Container>
    </div>
)}
