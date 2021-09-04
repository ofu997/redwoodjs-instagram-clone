import { useMutation, useQuery } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { QUERY } from 'src/components/ImagesCell'
import { toast } from '@redwoodjs/web/toast'
import { currentUser, getLoggedInUser, dummyObject } from 'src/functions/WebFunctions'
var jwt = require('jsonwebtoken')
import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import ImageModal from 'src/components/ImageModal'
import { Heart, HeartFill, PersonCircle, Chat } from 'react-bootstrap-icons'

const DELETE_IMAGE_MUTATION = gql`
  mutation DeleteImageMutation($id: Int!) {
    deleteImage(id: $id) {
      id
    }
  }
`

const INCREMENT_IMAGE_LIKES_MUTATION = gql`
  mutation IncrementImageLikesMutation($imageId: Int!, $currentUserId: Int!) {
    incrementImageLikes(id: $imageId, currentUserId: $currentUserId) {
      likes
    }
  }
`

const DECREMENT_IMAGE_LIKES_MUTATION = gql`
  mutation DecrementImageLikesMutation($imageId: Int!, $currentUserId: Int!) {
    decrementImageLikes(id: $imageId, currentUserId: $currentUserId) {
      likes
    }
  }
`

const ADD_TO_USER_LIKES_MUTATION = gql`
  mutation AddToUserLikesMutation($imageId: Int!, $currentUserId: Int!) {
    addToUserLikes(imageId: $imageId, id: $currentUserId) {
      userLikes {
        id
      }
    }
  }
`

const REMOVE_FROM_USER_LIKES_MUTATION = gql`
  mutation RemoveFromUserLikesMutation($imageId: Int!, $currentUserId: Int!) {
    removeFromUserLikes(imageId: $imageId, id: $currentUserId) {
      userLikes {
        id
      }
    }
  }
`

const USER_QUERY = gql`
  query GetUserJwtById($currentUserId: Int!) {
    user (id: $currentUserId) {
      id
      jwt
      isAdmin
      localStoragePassword
      images {
        id
      }
    }
  }
`

const Images = props => {
  const { images, viewStandalone } = props;
  const [modalShow, setModalShow] = useState(false);
  const [activeItem, setActiveItem] = useState([])

  const currentUserId = getLoggedInUser().id;

  const handleShow = id => {
    setActiveItem(id);
    setModalShow(true);
  }

  const { error, data } = currentUserId ?
    useQuery(USER_QUERY, {
      variables: { currentUserId },
    })
    :
    dummyObject;

  const missingData = (!data || !currentUserId )? true : false;

  const MAX_STRING_LENGTH = 150

  const truncate = (text) => {
    let output = text
    if (text && text.length > MAX_STRING_LENGTH) {
      output = output.substring(0, MAX_STRING_LENGTH) + '...'
    }
    return output
  }

  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION, {
    onCompleted: () => {
      toast.success('Image deleted.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const [incrementImageLikes] = useMutation(INCREMENT_IMAGE_LIKES_MUTATION, {
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const [decrementImageLikes] = useMutation(DECREMENT_IMAGE_LIKES_MUTATION, {
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const [addToUserLikes] = useMutation(ADD_TO_USER_LIKES_MUTATION, {
    onCompleted: () => {
      console.log('added to user likes')
    },
    awaitRefetchQueries: true,
  })

  const [removeFromUserLikes] = useMutation(REMOVE_FROM_USER_LIKES_MUTATION, {
    onCompleted: () => {
      console.log('removed from user likes')
    },
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete image ' + id + '?')) {
      deleteImage({ variables: { id } })
    }
  }

  const handleLikes = (imageId, action) => {
    ( currentUser.localStoragePassword === data.user.localStoragePassword ) ?
    jwt.verify(data.user.jwt, `${process.env.MY_SECRET}`, function(err, decoded) {
      if (err) {
        toast.error('Please log in again')
      }
      else {
        switch(action) {
          case "like":
            console.log('incrementLikes() pressed');
            incrementImageLikes({ variables: { imageId, currentUserId } });
            addToUserLikes({ variables: { imageId, currentUserId } });
            break;
          case "dislike":
            console.log('decrementLikes() pressed');
            decrementImageLikes({ variables: { imageId, currentUserId } });
            removeFromUserLikes({ variables: { imageId, currentUserId } });
            break;
        }
      }
    })
    :
    toast.error("Womp womp...invalid credentials")
  }

  return (
    <>
      {error && <h1>Cannot find user at this moment</h1>}
      <div id='cardContainer' className='flex flexWrapWrap justifyContentSE'>
      {images.map((image) => {
        const currentUserLikesThis = image.likedBy.some(item => item.id === currentUserId);

        return (
          <Card
            className='card'
            key={image.id}
          >
            <div id='cardPicHandle' className='flex'>
              <div className='header-profile-pic' style={{ marginLeft:20 }}>
                {image.user?.profilePicUrl
                  ? <img src={image.user?.profilePicUrl} />
                  : <PersonCircle size={20} color='black' />
                }
              </div>
              <Link
                to={routes.userPage({ handle : image.user.handle })}
                className='link-that-does-not-look-like-a-link'
              >
                <p style={{ marginLeft: 10, fontWeight: 500 }}>{image.user?.handle}</p>
              </Link>
            </div>
            <img src={image.url}
              className='cardImg'
              onClick={() => handleShow(image.id)}
            />
            <Card.Body id='cardBody' bsPrefix='div'>
              <section id="icons-and-comment-form">
                <div className='flex'>
                  <div className='block like-and-comment-icons'>
                    {currentUserLikesThis ?
                    <button
                      onClick={() => handleLikes(image.id, "dislike") }
                    >
                      <HeartFill size={20} color="red" />
                    </button>
                    :
                    <button
                      onClick={() => handleLikes(image.id, "like")}
                      disabled={missingData}
                    >
                      <Heart size={20} />
                    </button>}
                    <p style={{ marginTop: -10 }}>{image?.likes} {image?.likes === 1 ? `like` : `likes`}</p>
                  </div>
                  <div className='block like-and-comment-icons'>
                    <Chat size={20} />
                    <p style={{ marginTop: -5 }}>{image?.comments.length}</p>
                  </div>
                </div>
                <div className='flex' style={{ marginTop : 5 }}>
                  <p>
                    <Link
                      to={routes.userPage({ handle : image.user.handle })}
                      className='link-that-does-not-look-like-a-link'
                    >
                      <strong>{image.user.handle}</strong>
                    </Link>  {truncate(image.title)}
                  </p>
                </div>
                <p id='created-at' className='rc-font-size'>{image?.createdAt}</p>
              </section>
            </Card.Body>
          </Card>
        )
      })}
      </div>
      <ImageModal
        show={modalShow}
        onHide={() => setModalShow(false)}

        imageId={activeItem}
        data={data}
        missingData={missingData}
        handleLikes={handleLikes}
        deleteClick={onDeleteClick}
        handleShow={handleShow}
        images={images}
        viewStandalone={viewStandalone}
      />
    </>
  )
}

export default Images



// Show image and edit image are <Link>s, while delete image is an <a>

// useMutation returns a tuple that includes:
// A mutate function that you can call at any time to execute the mutation
// An object with fields that represent the current status of the mutation's execution
// src: https://www.apollographql.com/docs/react/data/mutations/
