import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import CommentsCell from 'src/components/CommentsCell'

import { QUERY } from 'src/components/ImagesCell'

const DELETE_IMAGE_MUTATION = gql`
  mutation DeleteImageMutation($id: Int!) {
    deleteImage(id: $id) {
      id
    }
  }
`
// const UPDATE_LIKE_MUTATION = gql`
//   mutation ($id: Int!, $likes: Int!) {
//     updateLikes(id: $id, likes: $likes) {
//       likes
//     }
//   }
// `

const UPDATE_LIKE_MUTATION = gql`
  mutation ($id: Int!, $currentUserId: Int!) {
    updateLikes(id: $imageId, currentUserId: $currentUserId) {
      likes
    }
  }
`

const UPDATE_USER_LIKES_MUTATION = gql`
  mutation($imageId: Int!, $currentUserId: Int!) {
    updateUserLikes(imageId: $imageId, currentUserId: $currentUserId) {
      userLikes {
        id
      }
    }
  }
`

const USER_QUERY = gql`
  query ($currentUserId: Int!) {
    user (id: $currentUserId) {
      id
      name
      email
      handle
      password

      userLikes {
        id
        title
      }
      images {
        id
        title
      }
    }
  }
`

const currentUserId = 1

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

const ImagesList = ({ images, user }) => {
  const { addMessage } = useFlash()
  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION, {
    onCompleted: () => {
      addMessage('Image deleted.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const [updateLikes] = useMutation(UPDATE_LIKE_MUTATION, {
    onCompleted: () => {
      console.log('[updateLikes] was pressed')
      addMessage('Likes updated.', { classes: 'rw-flash-success' })
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const [updateUserLikes] = useMutation(UPDATE_USER_LIKES_MUTATION, {
    onCompleted: () => {
      console.log('[updateUserLikes] was pressed')
    },
    refetchQueries: [{ query: USER_QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete image ' + id + '?')) {
      deleteImage({ variables: { id } })
    }
  }

  // const incrementLikes = (id, likes) => {
  //   updateLikes({ variables: { id, likes }})
  // }

  const incrementLikes = (imageId, currentUserId) => {
    console.log('incrementLikes() pressed')
    updateLikes({ variables: { imageId, currentUserId }})
    updateUserLikes({ variables: imageId, currentUserId })
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead style={{ border: '5px solid black'}}>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th style={{ width: 150 }}></th>
            {/* <th>Url</th> */}
            <th>Likes</th>
            <th>Which users like this</th>
            <th style={{ width: 150 }}></th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr key={image.id}>
              <td>{truncate(image.id)}</td>
              <td>{truncate(image.title)}</td>
              <td>
                <a href={image.url} target="_blank">
                  <img src={image.url} style={{ maxWidth: '150px' }} />
                </a>
              </td>
              {/* <td>{truncate(image.url)}</td> */}
              <td>{truncate(image.likes)}</td>
              <td>{/*logic for displaying if user likes this. use useQuery from Apollo */}
                {image.likedBy.some(item => item.id === currentUserId) &&
                  <p>current user: {user.handle} likes this</p>
                }
                {image.likedBy.map(item => {
                  return <p>user with id: {item.id} likes this</p>
                })}
              </td>
              <td>
                <button
                  // onClick={() => incrementLikes(image.id, image.likes)}
                  onClick={() => incrementLikes(image.id, currentUserId)}
                >
                  like
                </button>
              </td>
              <td>
                <CommentsCell imageId={image.id} />
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
                    href="#"
                    title={'Delete image ' + image.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(image.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ImagesList

// Show image and edit image are <Link>s, while delete image is an <a>

// useMutation returns a tuple that includes:
// A mutate function that you can call at any time to execute the mutation
// An object with fields that represent the current status of the mutation's execution
// src: https://www.apollographql.com/docs/react/data/mutations/

