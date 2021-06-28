import { useMutation, useQuery } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import Comment from 'src/components/Comment'
import { QUERY } from 'src/components/ImagesCell'
import { toast } from '@redwoodjs/web/toast'
import { getLoggedInUser } from 'src/functions/GetLoggedInUser'
var jwt = require('jsonwebtoken')
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import ImageModal from 'src/components/ImageModal'
import CommentForm from 'src/components/CommentForm'

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

const dummyObject = { error: null, data: null };

const Images = ({ images }) => {
  const currentUser = getLoggedInUser();
  const currentUserId = currentUser.id;
  const [modalShow, setModalShow] = useState(false);
  const [activeItem, setActiveItem] = useState([])

  const handleShow = id => {
    setActiveItem(id);
    setModalShow(true);
  }

  const { error, data } = currentUserId ?
    useQuery(USER_QUERY, {
      variables: { currentUserId }
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
    onCompleted: () => {
      console.log('like button was pressed')
      toast.success('Likes incremented.', { classes: 'rw-flash-success' })
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const [decrementImageLikes] = useMutation(DECREMENT_IMAGE_LIKES_MUTATION, {
    onCompleted: () => {
      console.log('dislike button was pressed')
      toast.success('Likes decremented.', { classes: 'rw-flash-success' })
    },
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

  const handleLikes = (imageId, type) => {
    ( currentUser.localStoragePassword === data.user.localStoragePassword ) ?
    jwt.verify(data.user.jwt, 'my-secret-from-env-file-in-prod', function(err, decoded) {
      if (err) {
        toast.error('Please log in again')
      }
      else {
        switch(type) {
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
    toast.error("Impersonation attempt!")
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      {error && <h1>Cannot find user at this moment</h1>}
      <table className="rw-table">
        <thead style={{ border: '5px solid black' }}>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th style={{ width: 150 }}></th>
            <th>Likes</th>
            <th>Which users like this</th>
            <th style={{ width: 150 }}></th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => {
            const currentUserLikesThis = image.likedBy.some(item => item.id === currentUserId);
            const userIsValidAndOwnsImage =
              Boolean((currentUser.localStoragePassword === data?.user.localStoragePassword)
              && data?.user.images.some(queriedImage => queriedImage.id === image.id));
            return (
              <tr key={image.id}>
                <td>{truncate(image.id)}</td>
                <td>{truncate(image.title)}</td>
                <td>
                  <img src={image.url} style={{ maxWidth: '150px' }} />
                </td>
                <td>{truncate(image.likes)}</td>
                {currentUser && (
                <td>
                  {currentUserLikesThis &&
                    <p>current user: {currentUser.handle} likes this</p>
                  }
                  {image.likedBy.map(user => {
                    return <p key={user.id}>user with id: {user.id} likes this</p>
                  })}
                </td>
                )}
                <td>
                {currentUserLikesThis ?
                <button
                  onClick={() => handleLikes(image.id, "dislike")}
                >
                  redHeart
                </button>
                :
                <button
                  onClick={() => handleLikes(image.id, "like")}
                  disabled={missingData}
                >
                  blankHeart
                </button>}
                </td>
                <td>
                {image.comments.map(comment =>
                    <Comment
                      comment={comment}
                      user={data?.user}
                      key={comment.id}
                      LSuser={currentUser}
                    />
                )}
                <CommentForm imageId={image.id} userId={currentUserId} />
                </td>
                <td>
                  <nav className="rw-table-actions">
                    <Link
                      to={routes.image({ id: image.id })}
                      title={'Show image ' + image.id + ' detail'}
                      className="rw-button rw-button-small"
                    >
                      Show
                    </Link>
                    <Button variant="primary" onClick={() => handleShow(image.id)}>
                      Launch vertically centered modal: {image.title}
                    </Button>
                    {userIsValidAndOwnsImage && (
                        <Link
                          to={routes.editImage({ id: image.id })}
                          title={'Edit image ' + image.id}
                          className="rw-button rw-button-small rw-button-blue"
                        >
                          Edit
                        </Link>
                    )}
                    {(userIsValidAndOwnsImage || data?.user.isAdmin) && (
                      <a
                        href="/"
                        title={'Delete image ' + image.id}
                        className="rw-button rw-button-small rw-button-red"
                        onClick={() => onDeleteClick(image.id)}
                      >
                        Delete
                      </a>
                    )}
                  </nav>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
        <ImageModal
          show={modalShow}
          onHide={() => setModalShow(false)}

          imageId={activeItem}
          data={data}
          missingdata={missingData}
          handleLikes={handleLikes}
          deleteClick={onDeleteClick}
          handleShow={handleShow}
          images={images}
        />
    </div>
  )
}

export default Images



// Show image and edit image are <Link>s, while delete image is an <a>

// useMutation returns a tuple that includes:
// A mutate function that you can call at any time to execute the mutation
// An object with fields that represent the current status of the mutation's execution
// src: https://www.apollographql.com/docs/react/data/mutations/
