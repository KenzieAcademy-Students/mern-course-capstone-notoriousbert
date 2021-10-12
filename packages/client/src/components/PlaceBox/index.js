import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useProvideAuth } from 'hooks/useAuth'



const PlaceBox = ({ mapMarker }) => {
  // const { state } = useProvideAuth()

// const handleFavorite = (e) => {
//   console.log(e)
//   console.log(state)
// }
  return (
    <Container className='p-sm-2 p-md-4'>
      <Row>
        <Col>
          <div className='row justify-content-left mb-2'>
            <div className='col-xs-8 col-md-7'>
              <h1>{mapMarker.placeName}</h1>
            </div>
          </div>
          <div className='row justify-content-left mb-2'>
            <div className='col-xs-8 col-md-7'>
              <h4>{mapMarker.typeofPlace || mapMarker.typeOfPlace}</h4>
            </div>
          </div>
          <div className='row justify-content-left mb-2'>
            <div className='col-xs-8 col-md-7'>
              <h3>{mapMarker.address} <br /> {mapMarker.city},{mapMarker.state} <br />{mapMarker.zipcode}</h3>
            </div>
          </div>
          <div className='row justify-content-left mb-2'>
            <div className='col-xs-8 col-md-7'>
              <h6>Pet's Allowed: {mapMarker.petsAllowed.map((pet, index) => (index === mapMarker.petsAllowed.length - 1 ? <>{pet.category}</> : <>{pet.category}, </>))} </h6>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='row justify-content-left mb-2'>
            <div className='col-xs-8 col-md-7'>
              <h2>Reviews<br />{mapMarker.reviews.map((review) => <div>
                <h4>
                  <Link to={`/users/${review.author.username}`}>{review.author.username}</Link> - {review.created}
                </h4>
                <div>
                  {review.text}
                </div>
              </div>)} </h2>
            </div>
          </div>
      {/* <input type="submit" className="btn btn-primary" value="Add to Favorites" onClick={(e)=>{handleFavorite(e)}}/> */}
        </Col>
      </Row>
    </Container>
  )}

export default PlaceBox

// const handleToggleLike = async () => {
//   if (!likedState) {
//     setLiked(true)
//     setLikes(likesState + 1)
//     try {
//       await axios.post(`posts/like/${_id}`)
//     } catch (error) {
//       console.log(error)
//       return error
//     }
//   } else {
//     setLiked(false)
//     setLikes(likesState - 1)
//     try {
//       await axios.post(`posts/like/${_id}`)
//     } catch (error) {
//       console.log(error)
//       return error
//     }
//   }
// }
// router.all('/like/:postId', requireAuth, async (request, response) => {
//   const { postId } = request.params
//   const { user } = request
//   const post = await Post.findOne({ _id: postId })

//   if (!post) {
//     return response.status(422).json({ error: 'Cannot find post' })
//   }
//   try {
//     if (post.likes.includes(user.id)) {
//       const result = await post.updateOne({
//         $pull: { likes: user.id },
//       })

//       response.json(result)
//     } else {
//       const result = await post.updateOne({
//         $push: { likes: user.id },
//       })

//       response.json(result)
//     }
//   } catch (err) {
//     return response.status(422).json({ error: err })
//   }
// })
