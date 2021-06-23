import { useMutation, useQuery } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import Comment from 'src/components/Comment'
import { QUERY } from 'src/components/ImagesCell'
import { toast } from '@redwoodjs/web/toast'
import { getLoggedInUser } from 'src/functions/GetLoggedInUser'
import authContext from 'src/authContext'
import jwt_decode from "jwt-decode";
import { useContext, useState, useEffect } from 'react'
var jwt = require('jsonwebtoken')

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
      images {
        id
      }
    }
  }
`

const Images = ({ images }) => {
  const currentUser = getLoggedInUser();

  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { currentUserId: currentUser.id }
  })

  const missingData = (!data || !currentUser.id )? true : false;

  // currentUserJwtByContext: an extra variable to secure actions on images
  const { userToken } = useContext(authContext)
  const [currentUserJwtByContext, setCurrentUserJwtByContext] = useState('')
  useEffect(() => {
    userToken && (
      setCurrentUserJwtByContext(jwt_decode(userToken))
    )
  }, [])

  const MAX_STRING_LENGTH = 150

  const thumbnail = (url) => {
    const parts = url.split('/')
    parts.splice(3, 0, 'resize=width:100')
    return parts.join('/')
  }

  const truncate = (text) => {
    let output = text
    if (text && text.length > MAX_STRING_LENGTH) {
      output = output.substring(0, MAX_STRING_LENGTH) + '...'
    }
    return output
  }

  const jsonTruncate = (obj) => {
    return truncate(JSON.stringify(obj, null, 2))
  }

  const timeTag = (datetime) => {
    return (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  }

  const checkboxInputTag = (checked) => {
    return <input type="checkbox" checked={checked} disabled />
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

  const handleLikes = (imageId, currentUserId, jwtFromUseQuery, type) => {
    const decodedJwtFromUseQuery = jwt_decode(jwtFromUseQuery);
    const decodedIdFromJwtFromUseQuery = decodedJwtFromUseQuery.id;

    (currentUserId == currentUserJwtByContext.id || currentUserId == decodedIdFromJwtFromUseQuery)?
      jwt.verify(jwtFromUseQuery, 'my-secret-from-env-file-in-prod', function(err, decoded) {
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
    <Console
      user={currentUserJwtByContext}
    />
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
            const currentUserLikesThis = image.likedBy.some(item => item.id === currentUser.id);
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
                  onClick={() => handleLikes(image.id, currentUser.id, data.user.jwt, "dislike")}
                >
                  redHeart
                </button>
                :
                <button
                  onClick={() => handleLikes(image.id, currentUser.id, data.user.jwt, "like")}
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
                    />
                  )
                }
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
                    <Link
                      to={routes.editImage({ id: image.id })}
                      title={'Edit image ' + image.id}
                      className="rw-button rw-button-small rw-button-blue"
                    >
                      Edit
                    </Link>
                    <a
                      href="/"
                      title={'Delete image ' + image.id}
                      className="rw-button rw-button-small rw-button-red"
                      onClick={() => onDeleteClick(image.id)}
                    >
                      Delete
                    </a>
                  </nav>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const Console = props => {
  console.log((new Date()).toUTCString());
  console.log(`currentUserJwtByContext is: ${props.user.handle}`)
  return false;
}

export default Images

// Show image and edit image are <Link>s, while delete image is an <a>

// useMutation returns a tuple that includes:
// A mutate function that you can call at any time to execute the mutation
// An object with fields that represent the current status of the mutation's execution
// src: https://www.apollographql.com/docs/react/data/mutations/
