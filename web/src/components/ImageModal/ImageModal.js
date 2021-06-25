import { useMutation, useQuery } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import Comment from 'src/components/Comment'
import { QUERY } from 'src/components/ImagesCell'
import { toast } from '@redwoodjs/web/toast'
import { getLoggedInUser } from 'src/functions/GetLoggedInUser'
import jwt_decode from "jwt-decode";
var jwt = require('jsonwebtoken')
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const ImageModal = props => {
  const currentUser = getLoggedInUser();
  const currentUserId = currentUser.id;
  const currentUserLikesThis = props.image?.likedBy?.some(item => item.id === currentUserId);
  // const missingData = (!data || !currentUserId )? true : false;
  const truncate = (text) => {
    let output = text
    if (text && text.length > MAX_STRING_LENGTH) {
      output = output.substring(0, MAX_STRING_LENGTH) + '...'
    }
    return output
  }

  // const { loading, error, data } = currentUserId ?
  //   useQuery(MODAL_USER_QUERY, {
  //     variables: { currentUserId }
  //   })
  //   :
  //   dummyObject;

  const MAX_STRING_LENGTH = 150

  const MODAL_USER_QUERY = gql`
  query ModalGetUserJwtById($currentUserId: Int!) {
    user (id: $currentUserId) {
      id
      jwt
      localStoragePassword
      images {
        id
      }
    }
  }
`
  // const dummyObject = { loading: null, error: null, data: null };
  return(
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <table>
      <tbody>

        <tr key={props.image.id}>
          <td>{truncate(props.image.id)}</td>
          <td>{truncate(props.image.title)}</td>
          <td>
            <img src={props.image.url} style={{ maxWidth: '150px' }} />
          </td>
          {/* <td>{truncate(props.image.likes)}</td>
                  {currentUser && (
                  <td>
                    {currentUserLikesThis &&
                      <p>current user: {currentUser.handle} likes this</p>
                    }
                    {props.image.likedBy.map(user => {
                      return <p key={user.id}>user with id: {user.id} likes this</p>
                    })}
                  </td>
                  )}
                  <td>
                  {currentUserLikesThis ?
                  <button
                    onClick={() => handleLikes(props.image.id, "dislike")}
                  >
                    redHeart
                  </button>
                  :
                  <button
                    onClick={() => handleLikes(props.image.id, "like")}
                    disabled={missingData}
                  >
                    blankHeart
                  </button>}
                  </td>
                  <td>
                  {props.image.comments.map(comment =>
                      <Comment
                        comment={comment}
                        user={data?.user}
                        key={comment.id}
                        LSuser={currentUser}
                      />
                    )
                  }
                  </td> */}
          <td>
            <nav className="rw-table-actions">
              <Link
                to={routes.editImage({ id: props.image.id })}
                title={'Edit image ' + props.image.id}
                className="rw-button rw-button-small rw-button-blue"
              >
                Edit
              </Link>
              <a
                href="/"
                title={'Delete image ' + props.image.id}
                className="rw-button rw-button-small rw-button-red"
                onClick={() => onDeleteClick(props.image.id)}
              >
                Delete
              </a>
            </nav>
          </td>
        </tr>
      </tbody>
    </table>
    </Modal>
  )
}

export default ImageModal